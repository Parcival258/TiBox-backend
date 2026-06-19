import Alert, { type AlertSeverity } from '#models/alert'
import Equipment from '#models/equipment'
import EquipmentLoan from '#models/equipment_loan'
import FailureReport from '#models/failure_report'
import MaintenanceSchedule from '#models/maintenance_schedule'
import User from '#models/user'
import AuditService, { type AuditContext } from '#services/audit/audit_service'
import AlertDeliveryService from '#services/alerts/alert_delivery_service'
import realtimeService from '#services/realtime/realtime_service'
import { DateTime } from 'luxon'

type ListAlertFilters = {
  assignedTo?: string
  equipmentId?: string
  page?: number
  perPage?: number
  severity?: string
  status?: string
  type?: string
}

type AlertCandidate = {
  alertKey: string
  assignedTo?: string | null
  channels?: string[]
  dueAt?: DateTime | null
  entityId: string
  entityType: string
  equipmentId?: string | null
  message: string
  metadata?: Record<string, unknown>
  severity: AlertSeverity
  title: string
  type: string
}

export default class AlertService {
  private auditService = new AuditService()
  private deliveryService = new AlertDeliveryService()

  list(filters: ListAlertFilters) {
    const query = Alert.query()
      .preload('equipment')
      .preload('assignee')
      .orderByRaw(
        "case severity when 'critical' then 1 when 'high' then 2 when 'medium' then 3 else 4 end"
      )
      .orderBy('due_at', 'asc')
      .orderBy('created_at', 'desc')

    if (filters.status) {
      query.where('status', filters.status)
    }

    if (filters.severity) {
      query.where('severity', filters.severity)
    }

    if (filters.type) {
      query.where('type', filters.type)
    }

    if (filters.equipmentId) {
      query.where('equipment_id', filters.equipmentId)
    }

    if (filters.assignedTo) {
      query.where('assigned_to', filters.assignedTo)
    }

    return query.paginate(filters.page ?? 1, filters.perPage ?? 20)
  }

  catalogs() {
    return {
      channels: [
        { label: 'Notificacion interna', value: 'internal' },
        { label: 'Correo', value: 'email' },
      ],
      severities: [
        { label: 'Baja', value: 'low' },
        { label: 'Media', value: 'medium' },
        { label: 'Alta', value: 'high' },
        { label: 'Critica', value: 'critical' },
      ],
      statuses: [
        { label: 'Abierta', value: 'open' },
        { label: 'Reconocida', value: 'acknowledged' },
        { label: 'Resuelta', value: 'resolved' },
      ],
      types: [
        { label: 'Sin mantenimiento hace 6 meses', value: 'maintenance_overdue_6_months' },
        { label: 'Garantia proxima a vencer', value: 'warranty_expiring' },
        { label: 'Arriendo proximo a renovar', value: 'lease_expiring' },
        { label: 'Mantenimiento programado manana', value: 'maintenance_tomorrow' },
        { label: 'Falla reportada en equipo', value: 'damaged_equipment_reported' },
        { label: 'Solicitud de prestamo', value: 'equipment_loan_requested' },
        { label: 'Prestamo de equipo vencido', value: 'equipment_loan_overdue' },
      ],
    }
  }

  async runAutomaticChecks(referenceDate = DateTime.local(), audit?: AuditContext) {
    const candidates = [
      ...(await this.findMaintenanceOverdue(referenceDate)),
      ...(await this.findWarrantyExpiring(referenceDate)),
      ...(await this.findLeaseExpiring(referenceDate)),
      ...(await this.findMaintenanceTomorrow(referenceDate)),
      ...(await this.findDamagedEquipmentReports()),
      ...(await this.findOverdueEquipmentLoans(referenceDate)),
    ]

    const alerts = await Promise.all(candidates.map((candidate) => this.upsert(candidate, audit)))
    const deliveries = await Promise.all(alerts.map((alert) => this.deliveryService.prepare(alert)))

    return {
      generated: alerts.length,
      alerts,
      deliveries,
    }
  }

  async createForFailureReport(failureReportId: string, audit?: AuditContext) {
    const report = await FailureReport.query()
      .where('id', failureReportId)
      .preload('equipment', (equipmentQuery) => {
        equipmentQuery.preload('currentResponsible')
      })
      .preload('reporter')
      .first()

    if (!report) {
      return null
    }

    return this.upsert(
      {
        alertKey: `damaged_equipment_reported:${report.id}`,
        assignedTo: null,
        channels: ['internal'],
        entityId: report.id,
        entityType: 'failure_report',
        equipmentId: report.equipmentId,
        message: `El equipo ${report.equipment.internalCode} tiene una falla reportada: ${report.title}.`,
        metadata: {
          failureReportTitle: report.title,
          priority: report.priority,
          reportedBy: report.reportedBy,
        },
        severity: this.failureSeverity(report.priority),
        title: 'Falla reportada en equipo',
        type: 'damaged_equipment_reported',
      },
      audit
    )
  }

  async createForLoanRequest(loanId: string, audit?: AuditContext) {
    const loan = await EquipmentLoan.query().where('id', loanId).preload('user').first()

    if (!loan) {
      return null
    }

    return this.upsert(
      {
        alertKey: `equipment_loan_requested:${loan.id}`,
        assignedTo: null,
        channels: ['internal'],
        entityId: loan.id,
        entityType: 'equipment_loan',
        equipmentId: null,
        message: `${loan.user?.name ?? 'Un usuario'} solicito ${loan.requestedItem}.`,
        metadata: {
          requestedBy: loan.userId,
          requestedItem: loan.requestedItem,
        },
        severity: 'medium',
        title: 'Nueva solicitud de prestamo',
        type: 'equipment_loan_requested',
      },
      audit
    )
  }

  async acknowledge(id: string, audit?: AuditContext) {
    const alert = await Alert.find(id)

    if (!alert) {
      return null
    }

    const oldValues = { ...alert.$attributes }

    alert.status = 'acknowledged'
    alert.acknowledgedAt = DateTime.local()
    alert.acknowledgedBy = audit?.userId ?? null
    await alert.save()
    await this.loadRealtimeRelations(alert)

    await this.auditService.record({
      ...audit,
      action: 'alert.acknowledged',
      entityType: 'alert',
      entityId: alert.id,
      oldValues,
      newValues: alert.$attributes,
    })

    realtimeService.emitAlert('alerts:updated', alert)

    return alert
  }

  async assign(id: string, assignedTo: string, audit?: AuditContext) {
    const [alert, user] = await Promise.all([
      Alert.find(id),
      User.query().where('id', assignedTo).where('is_active', true).first(),
    ])

    if (!alert || !user) {
      return null
    }

    const oldValues = { ...alert.$attributes }

    alert.assignedTo = user.id
    alert.channels = this.channelsFor(user.email)
    await alert.save()
    await alert.load('equipment')
    await alert.load('assignee')

    await this.auditService.record({
      ...audit,
      action: 'alert.assigned',
      entityType: 'alert',
      entityId: alert.id,
      oldValues,
      newValues: alert.$attributes,
    })

    realtimeService.emitAlert('alerts:assigned', alert)

    return alert
  }

  selfAssign(id: string, audit?: AuditContext) {
    if (!audit?.userId) {
      return null
    }

    return this.assign(id, audit.userId, audit)
  }

  async addNote(id: string, note: string, audit?: AuditContext) {
    const alert = await Alert.find(id)

    if (!alert) {
      return null
    }

    const oldValues = { ...alert.$attributes }
    const notes = Array.isArray(alert.metadata?.notes) ? alert.metadata.notes : []

    alert.metadata = {
      ...(alert.metadata ?? {}),
      notes: [
        ...notes,
        {
          createdAt: DateTime.local().toISO(),
          note,
          userId: audit?.userId ?? null,
        },
      ],
    }

    await alert.save()
    await alert.load('equipment')
    await alert.load('assignee')

    await this.auditService.record({
      ...audit,
      action: 'alert.note_added',
      entityType: 'alert',
      entityId: alert.id,
      oldValues,
      newValues: alert.$attributes,
    })

    realtimeService.emitAlert('alerts:note_added', alert)

    return alert
  }

  async resolve(id: string, audit?: AuditContext) {
    const alert = await Alert.find(id)

    if (!alert) {
      return null
    }

    const oldValues = { ...alert.$attributes }

    alert.status = 'resolved'
    alert.resolvedAt = DateTime.local()
    alert.resolvedBy = audit?.userId ?? null
    await alert.save()
    await this.loadRealtimeRelations(alert)

    await this.auditService.record({
      ...audit,
      action: 'alert.resolved',
      entityType: 'alert',
      entityId: alert.id,
      oldValues,
      newValues: alert.$attributes,
    })

    realtimeService.emitAlert('alerts:resolved', alert)

    return alert
  }

  async dismiss(id: string, audit?: AuditContext) {
    const alert = await Alert.find(id)

    if (!alert) {
      return null
    }

    const oldValues = { ...alert.$attributes }

    alert.status = 'dismissed'
    await alert.save()
    await this.loadRealtimeRelations(alert)

    await this.auditService.record({
      ...audit,
      action: 'alert.dismissed',
      entityType: 'alert',
      entityId: alert.id,
      oldValues,
      newValues: alert.$attributes,
    })

    realtimeService.emitAlert('alerts:dismissed', alert)

    return alert
  }

  async resolveByKey(alertKey: string, audit?: AuditContext) {
    const alert = await Alert.findBy('alert_key', alertKey)

    if (!alert || alert.status === 'resolved') {
      return alert
    }

    return this.resolve(alert.id, audit)
  }

  private async upsert(candidate: AlertCandidate, audit?: AuditContext) {
    const existingAlert = await Alert.findBy('alert_key', candidate.alertKey)
    const alert = await Alert.updateOrCreate(
      { alertKey: candidate.alertKey },
      {
        ...candidate,
        channels: candidate.channels ?? ['internal'],
        status: 'open',
        triggeredAt: DateTime.local(),
      }
    )
    await this.loadRealtimeRelations(alert)

    await this.auditService.record({
      ...audit,
      action: 'alert.generated',
      entityType: 'alert',
      entityId: alert.id,
      newValues: alert.$attributes,
    })

    realtimeService.emitAlert(existingAlert ? 'alerts:updated' : 'alerts:created', alert)

    return alert
  }

  private async loadRealtimeRelations(alert: Alert) {
    await alert.load('equipment')
    await alert.load('assignee')
  }

  private async findMaintenanceOverdue(referenceDate: DateTime) {
    const limit = referenceDate.minus({ months: 6 }).toSQLDate()!
    const equipment = await Equipment.query()
      .whereNull('deleted_at')
      .whereNot('status', 'retired')
      .where((query) => {
        query.whereNull('last_maintenance_at').orWhere('last_maintenance_at', '<=', limit)
      })
      .preload('currentResponsible')

    return equipment.map((item) => ({
      alertKey: `maintenance_overdue_6_months:${item.id}`,
      assignedTo: item.currentResponsibleId,
      channels: this.channelsFor(item.currentResponsible?.email),
      entityId: item.id,
      entityType: 'equipment',
      equipmentId: item.id,
      message: `El equipo ${item.internalCode} no registra mantenimiento en los ultimos 6 meses.`,
      metadata: { internalCode: item.internalCode, lastMaintenanceAt: item.lastMaintenanceAt },
      severity: 'high' as const,
      title: 'Equipo sin mantenimiento hace 6 meses',
      type: 'maintenance_overdue_6_months',
    }))
  }

  private async findWarrantyExpiring(referenceDate: DateTime) {
    const from = referenceDate.toSQLDate()!
    const to = referenceDate.plus({ days: 30 }).toSQLDate()!
    const equipment = await Equipment.query()
      .whereNull('deleted_at')
      .whereBetween('warranty_until', [from, to])
      .preload('currentResponsible')

    return equipment.map((item) => ({
      alertKey: `warranty_expiring:${item.id}:${item.warrantyUntil?.toSQLDate()}`,
      assignedTo: item.currentResponsibleId,
      channels: this.channelsFor(item.currentResponsible?.email),
      dueAt: item.warrantyUntil,
      entityId: item.id,
      entityType: 'equipment',
      equipmentId: item.id,
      message: `La garantia del equipo ${item.internalCode} vence pronto.`,
      metadata: { internalCode: item.internalCode, warrantyUntil: item.warrantyUntil },
      severity: 'medium' as const,
      title: 'Garantia proxima a vencer',
      type: 'warranty_expiring',
    }))
  }

  private async findLeaseExpiring(referenceDate: DateTime) {
    const from = referenceDate.toSQLDate()!
    const to = referenceDate.plus({ days: 60 }).toSQLDate()!
    const equipment = await Equipment.query()
      .whereNull('deleted_at')
      .where('ownership_type', 'leased')
      .whereBetween('lease_until', [from, to])
      .preload('currentResponsible')

    return equipment.map((item) => ({
      alertKey: `lease_expiring:${item.id}:${item.leaseUntil?.toSQLDate()}`,
      assignedTo: item.currentResponsibleId,
      channels: this.channelsFor(item.currentResponsible?.email),
      dueAt: item.leaseUntil,
      entityId: item.id,
      entityType: 'equipment',
      equipmentId: item.id,
      message: `El arriendo del equipo ${item.internalCode} esta proximo a renovacion.`,
      metadata: { internalCode: item.internalCode, leaseUntil: item.leaseUntil },
      severity: 'medium' as const,
      title: 'Equipo arrendado proximo a renovacion',
      type: 'lease_expiring',
    }))
  }

  private async findMaintenanceTomorrow(referenceDate: DateTime) {
    const tomorrow = referenceDate.plus({ days: 1 }).toSQLDate()!
    const schedules = await MaintenanceSchedule.query()
      .whereIn('status', ['scheduled', 'pending', 'rescheduled'])
      .where('scheduled_for', tomorrow)
      .preload('equipment')
      .preload('assignedTechnician')

    return schedules.map((schedule) => ({
      alertKey: `maintenance_tomorrow:${schedule.id}:${schedule.scheduledFor.toSQLDate()}`,
      assignedTo: schedule.assignedTechnicianId,
      channels: this.channelsFor(schedule.assignedTechnician?.email),
      dueAt: schedule.scheduledFor,
      entityId: schedule.id,
      entityType: 'maintenance_schedule',
      equipmentId: schedule.equipmentId,
      message: `El equipo ${schedule.equipment.internalCode} tiene mantenimiento programado manana.`,
      metadata: {
        maintenanceType: schedule.maintenanceType,
        scheduledFor: schedule.scheduledFor,
      },
      severity: 'high' as const,
      title: 'Mantenimiento programado manana',
      type: 'maintenance_tomorrow',
    }))
  }

  private async findDamagedEquipmentReports() {
    const reports = await FailureReport.query()
      .whereIn('status', ['open', 'in_review'])
      .preload('equipment', (equipmentQuery) => {
        equipmentQuery.preload('currentResponsible')
      })
      .preload('reporter')

    return reports.map((report) => ({
      alertKey: `damaged_equipment_reported:${report.id}`,
      assignedTo: null,
      channels: ['internal'],
      entityId: report.id,
      entityType: 'failure_report',
      equipmentId: report.equipmentId,
      message: `El equipo ${report.equipment.internalCode} tiene una falla reportada: ${report.title}.`,
      metadata: {
        failureReportTitle: report.title,
        priority: report.priority,
        reportedBy: report.reportedBy,
      },
      severity: this.failureSeverity(report.priority),
      title: 'Falla reportada en equipo',
      type: 'damaged_equipment_reported',
    }))
  }

  private async findOverdueEquipmentLoans(referenceDate: DateTime) {
    const today = referenceDate.toSQLDate()!
    const loans = await EquipmentLoan.query()
      .whereIn('status', ['active', 'overdue'])
      .whereNull('returned_at')
      .where('estimated_return_at', '<', today)
      .preload('equipment')
      .preload('user')

    await Promise.all(
      loans
        .filter((loan) => loan.status === 'active')
        .map(async (loan) => {
          loan.status = 'overdue'
          await loan.save()
        })
    )

    return loans.map((loan) => ({
      alertKey: `equipment_loan_overdue:${loan.id}`,
      assignedTo: null,
      channels: ['internal'],
      dueAt: loan.estimatedReturnAt,
      entityId: loan.id,
      entityType: 'equipment_loan',
      equipmentId: loan.equipmentId,
      message: `El prestamo del equipo ${loan.equipment.internalCode} a ${loan.borrowerLabel} vencio el ${loan.estimatedReturnAt.toISODate()}.`,
      metadata: {
        borrower: loan.borrowerLabel,
        estimatedReturnAt: loan.estimatedReturnAt,
        requestedItem: loan.requestedItem,
      },
      severity: 'high' as const,
      title: 'Prestamo de equipo vencido',
      type: 'equipment_loan_overdue',
    }))
  }

  private failureSeverity(priority: string): AlertSeverity {
    if (priority === 'critical') return 'critical'
    if (priority === 'high') return 'high'
    if (priority === 'low') return 'low'

    return 'medium'
  }

  private channelsFor(email?: string | null) {
    return email ? ['internal', 'email'] : ['internal']
  }
}

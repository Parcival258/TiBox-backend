import Equipment from '#models/equipment'
import FailureReport from '#models/failure_report'
import MaintenanceRecord from '#models/maintenance_record'
import User from '#models/user'
import AlertService from '#services/alerts/alert_service'
import AuditService, { type AuditContext } from '#services/audit/audit_service'
import { DateTime } from 'luxon'

type FailureReportPayload = Partial<FailureReport>

type ListFailureReportFilters = {
  equipmentId?: string
  maintenanceRecordId?: string
  page?: number
  perPage?: number
  priority?: string
  reportedBy?: string
  search?: string
  status?: string
  visibleToResponsibleId?: string
}

type FailureReportOptions = {
  visibleToResponsibleId?: string
}

type FailureReportValidationErrors = Record<string, string[]>

export class FailureReportValidationError extends Error {
  constructor(public errors: FailureReportValidationErrors) {
    super('Failure report validation failed')
  }
}

export default class FailureReportService {
  private alertService = new AlertService()
  private auditService = new AuditService()

  list(filters: ListFailureReportFilters) {
    const query = FailureReport.query()
      .preload('equipment')
      .preload('reporter')
      .preload('maintenanceRecord')
      .orderBy('created_at', 'desc')

    if (filters.equipmentId) {
      query.where('equipment_id', filters.equipmentId)
    }

    if (filters.visibleToResponsibleId) {
      const responsibleId = filters.visibleToResponsibleId

      query.whereIn(
        'equipment_id',
        Equipment.query()
          .whereNull('deleted_at')
          .where((builder) => {
            builder
              .where('current_responsible_id', responsibleId)
              .orWhere('secondary_responsible_id', responsibleId)
          })
          .select('id')
      )
    }

    if (filters.reportedBy) {
      query.where('reported_by', filters.reportedBy)
    }

    if (filters.maintenanceRecordId) {
      query.where('maintenance_record_id', filters.maintenanceRecordId)
    }

    if (filters.status) {
      query.where('status', filters.status)
    }

    if (filters.priority) {
      query.where('priority', filters.priority)
    }

    if (filters.search) {
      query.where((builder) => {
        builder
          .whereILike('title', `%${filters.search}%`)
          .orWhereILike('description', `%${filters.search}%`)
      })
    }

    return query.paginate(filters.page ?? 1, filters.perPage ?? 20)
  }

  find(id: string, options: FailureReportOptions = {}) {
    const query = FailureReport.query()
      .where('id', id)
      .preload('equipment')
      .preload('reporter')
      .preload('maintenanceRecord')

    if (options.visibleToResponsibleId) {
      const responsibleId = options.visibleToResponsibleId

      query.whereIn(
        'equipment_id',
        Equipment.query()
          .whereNull('deleted_at')
          .where((builder) => {
            builder
              .where('current_responsible_id', responsibleId)
              .orWhere('secondary_responsible_id', responsibleId)
          })
          .select('id')
      )
    }

    return query.first()
  }

  async create(
    payload: FailureReportPayload,
    audit?: AuditContext,
    options: FailureReportOptions = {}
  ) {
    await this.validate(payload, options)

    const report = await FailureReport.create({
      ...payload,
      reportedBy: payload.reportedBy ?? audit?.userId ?? null,
      status: payload.status ?? 'open',
      priority: payload.priority ?? 'medium',
    })

    await this.auditService.record({
      ...audit,
      action: 'failure_report.created',
      entityType: 'failure_report',
      entityId: report.id,
      newValues: report.$attributes,
    })

    await this.alertService.createForFailureReport(report.id, audit)

    return this.find(report.id)
  }

  async update(id: string, payload: FailureReportPayload, audit?: AuditContext) {
    const report = await FailureReport.find(id)

    if (!report) {
      return null
    }

    await this.validate({
      ...report.$attributes,
      ...payload,
    })

    const oldValues = { ...report.$attributes }

    report.merge(payload)

    if (payload.status === 'closed' || payload.status === 'resolved') {
      report.closedAt = report.closedAt ?? DateTime.local()
    } else if (payload.status) {
      report.closedAt = null
    }

    await report.save()

    await this.auditService.record({
      ...audit,
      action: 'failure_report.updated',
      entityType: 'failure_report',
      entityId: report.id,
      oldValues,
      newValues: report.$attributes,
    })

    if (report.status === 'closed' || report.status === 'resolved') {
      await this.alertService.resolveByKey(`damaged_equipment_reported:${report.id}`, audit)
    }

    return this.find(report.id)
  }

  close(id: string, payload: FailureReportPayload, audit?: AuditContext) {
    return this.update(
      id,
      {
        ...payload,
        status: payload.status ?? 'closed',
        closedAt: DateTime.local(),
      },
      audit
    )
  }

  private async validate(payload: FailureReportPayload, options: FailureReportOptions = {}) {
    const errors: FailureReportValidationErrors = {}

    await Promise.all([
      this.ensureEquipment(errors, payload.equipmentId, options.visibleToResponsibleId),
      this.ensureUser(errors, 'reportedBy', payload.reportedBy),
      this.ensureMaintenanceRecord(errors, payload.equipmentId, payload.maintenanceRecordId),
    ])

    if (Object.keys(errors).length > 0) {
      throw new FailureReportValidationError(errors)
    }
  }

  private async ensureEquipment(
    errors: FailureReportValidationErrors,
    equipmentId?: string | null,
    visibleToResponsibleId?: string
  ) {
    if (!equipmentId) {
      this.addError(errors, 'equipmentId', 'Equipment is required')
      return
    }

    const query = Equipment.query()
      .where('id', equipmentId)
      .whereNull('deleted_at')

    if (visibleToResponsibleId) {
      query.where((builder) => {
        builder
          .where('current_responsible_id', visibleToResponsibleId)
          .orWhere('secondary_responsible_id', visibleToResponsibleId)
      })
    }

    const equipment = await query.first()

    if (!equipment) {
      this.addError(errors, 'equipmentId', 'Equipment does not exist')
    }
  }

  private async ensureUser(
    errors: FailureReportValidationErrors,
    field: string,
    userId?: string | null
  ) {
    if (!userId) {
      return
    }

    const user = await User.query().where('id', userId).where('is_active', true).first()

    if (!user) {
      this.addError(errors, field, `${field} does not exist or is inactive`)
    }
  }

  private async ensureMaintenanceRecord(
    errors: FailureReportValidationErrors,
    equipmentId?: string | null,
    maintenanceRecordId?: string | null
  ) {
    if (!maintenanceRecordId) {
      return
    }

    const record = await MaintenanceRecord.query().where('id', maintenanceRecordId).first()

    if (!record) {
      this.addError(errors, 'maintenanceRecordId', 'Maintenance record does not exist')
      return
    }

    if (equipmentId && record.equipmentId !== equipmentId) {
      this.addError(
        errors,
        'maintenanceRecordId',
        'Maintenance record does not belong to the selected equipment'
      )
    }
  }

  private addError(errors: FailureReportValidationErrors, field: string, message: string) {
    errors[field] = [...(errors[field] ?? []), message]
  }
}

import Equipment from '#models/equipment'
import MaintenanceRecord from '#models/maintenance_record'
import MaintenanceSchedule from '#models/maintenance_schedule'
import User from '#models/user'
import AuditService, { type AuditContext } from '#services/audit/audit_service'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

type MaintenanceSchedulePayload = Partial<MaintenanceSchedule>
type RescheduleMaintenanceSchedulePayload = Pick<MaintenanceSchedule, 'scheduledFor'> &
  Partial<Pick<MaintenanceSchedule, 'assignedTechnicianId' | 'notes' | 'priority'>>

type ListMaintenanceScheduleFilters = {
  assignedTechnicianId?: string
  equipmentId?: string
  maintenanceType?: string
  page?: number
  perPage?: number
  priority?: string
  scheduledFrom?: DateTime
  scheduledTo?: DateTime
  status?: string
}

type MaintenanceValidationErrors = Record<string, string[]>

export class MaintenanceScheduleValidationError extends Error {
  constructor(public errors: MaintenanceValidationErrors) {
    super('Maintenance schedule validation failed')
  }
}

export const maintenanceScheduleCatalogs = {
  maintenanceTypes: [
    { label: 'Preventivo', value: 'preventive' },
    { label: 'Correctivo', value: 'corrective' },
  ],
  priorities: [
    { label: 'Baja', value: 'low' },
    { label: 'Media', value: 'medium' },
    { label: 'Alta', value: 'high' },
    { label: 'Critica', value: 'critical' },
  ],
  statuses: [
    { label: 'Programado', value: 'scheduled' },
    { label: 'Pendiente', value: 'pending' },
    { label: 'En proceso', value: 'in_progress' },
    { label: 'Finalizado', value: 'completed' },
    { label: 'Cancelado', value: 'cancelled' },
    { label: 'Reprogramado', value: 'rescheduled' },
    { label: 'Vencido', value: 'overdue' },
  ],
} as const

export default class MaintenanceScheduleService {
  private auditService = new AuditService()

  list(filters: ListMaintenanceScheduleFilters) {
    const query = MaintenanceSchedule.query()
      .preload('equipment')
      .preload('assignedTechnician')
      .orderBy('scheduled_for', 'desc')

    if (filters.equipmentId) {
      query.where('equipment_id', filters.equipmentId)
    }

    if (filters.assignedTechnicianId) {
      query.where('assigned_technician_id', filters.assignedTechnicianId)
    }

    if (filters.maintenanceType) {
      query.where('maintenance_type', filters.maintenanceType)
    }

    if (filters.status) {
      query.where('status', filters.status)
    }

    if (filters.priority) {
      query.where('priority', filters.priority)
    }

    if (filters.scheduledFrom) {
      query.where('scheduled_for', '>=', filters.scheduledFrom.toSQLDate()!)
    }

    if (filters.scheduledTo) {
      query.where('scheduled_for', '<=', filters.scheduledTo.toSQLDate()!)
    }

    return query.paginate(filters.page ?? 1, filters.perPage ?? 20)
  }

  find(id: string) {
    return MaintenanceSchedule.query()
      .where('id', id)
      .preload('equipment')
      .preload('assignedTechnician')
      .first()
  }

  catalogs() {
    return maintenanceScheduleCatalogs
  }

  async create(payload: MaintenanceSchedulePayload, audit?: AuditContext) {
    await this.validate(payload)

    const schedule = await db.transaction(async (trx) => {
      const createdSchedule = await MaintenanceSchedule.create(
        {
          ...payload,
          status: payload.status ?? 'scheduled',
          priority: payload.priority ?? 'medium',
          createdBy: audit?.userId ?? payload.createdBy,
          updatedBy: audit?.userId ?? payload.updatedBy,
        },
        { client: trx }
      )

      const record = await MaintenanceRecord.create(
        {
          description: createdSchedule.notes,
          equipmentId: createdSchedule.equipmentId,
          maintenanceScheduleId: createdSchedule.id,
          maintenanceType: createdSchedule.maintenanceType,
          performedBy: createdSchedule.assignedTechnicianId,
          priority: createdSchedule.priority,
          scheduledDate: createdSchedule.scheduledFor,
          status: createdSchedule.status,
          createdBy: audit?.userId ?? createdSchedule.createdBy,
          updatedBy: audit?.userId ?? createdSchedule.updatedBy,
        },
        { client: trx }
      )

      await this.auditService.record({
        ...audit,
        action: 'maintenance_schedule.created',
        entityType: 'maintenance_schedule',
        entityId: createdSchedule.id,
        newValues: createdSchedule.$attributes,
      })

      await this.auditService.record({
        ...audit,
        action: 'maintenance_record.created',
        entityType: 'maintenance_record',
        entityId: record.id,
        newValues: record.$attributes,
      })

      return createdSchedule
    })

    return this.find(schedule.id)
  }

  async update(id: string, payload: MaintenanceSchedulePayload, audit?: AuditContext) {
    const schedule = await MaintenanceSchedule.find(id)

    if (!schedule) {
      return null
    }

    await this.validate({
      ...schedule.$attributes,
      ...payload,
    })

    const oldValues = { ...schedule.$attributes }

    schedule.merge({
      ...payload,
      updatedBy: audit?.userId ?? payload.updatedBy,
    })
    await schedule.save()

    await this.auditService.record({
      ...audit,
      action: 'maintenance_schedule.updated',
      entityType: 'maintenance_schedule',
      entityId: schedule.id,
      oldValues,
      newValues: schedule.$attributes,
    })

    return this.find(schedule.id)
  }

  async cancel(id: string, audit?: AuditContext) {
    return this.changeStatus(id, 'cancelled', audit, 'maintenance_schedule.cancelled')
  }

  async markPending(id: string, audit?: AuditContext) {
    return this.changeStatus(id, 'pending', audit, 'maintenance_schedule.marked_pending')
  }

  async start(id: string, audit?: AuditContext) {
    const schedule = await MaintenanceSchedule.find(id)

    if (!schedule) {
      return null
    }

    await this.ensureProcessRecord(schedule, audit)

    return this.changeStatus(id, 'in_progress', audit, 'maintenance_schedule.started')
  }

  async finish(id: string, audit?: AuditContext) {
    return this.changeStatus(id, 'completed', audit, 'maintenance_schedule.finished')
  }

  async reschedule(
    id: string,
    payload: RescheduleMaintenanceSchedulePayload,
    audit?: AuditContext
  ) {
    const schedule = await MaintenanceSchedule.find(id)

    if (!schedule) {
      return null
    }

    await this.validate({
      ...schedule.$attributes,
      ...payload,
    })

    const oldValues = { ...schedule.$attributes }

    schedule.merge({
      ...payload,
      status: 'rescheduled',
      updatedBy: audit?.userId ?? schedule.updatedBy,
    })
    await schedule.save()
    await this.syncProcessRecordFromSchedule(schedule, audit)

    await this.auditService.record({
      ...audit,
      action: 'maintenance_schedule.rescheduled',
      entityType: 'maintenance_schedule',
      entityId: schedule.id,
      oldValues,
      newValues: schedule.$attributes,
    })

    return schedule
  }

  private async changeStatus(
    id: string,
    status: MaintenanceSchedule['status'],
    audit: AuditContext | undefined,
    action: string
  ) {
    const schedule = await MaintenanceSchedule.find(id)

    if (!schedule) {
      return null
    }

    const oldValues = { ...schedule.$attributes }

    schedule.status = status
    schedule.updatedBy = audit?.userId ?? schedule.updatedBy
    await schedule.save()
    await this.syncProcessRecordFromSchedule(schedule, audit)

    await this.auditService.record({
      ...audit,
      action,
      entityType: 'maintenance_schedule',
      entityId: schedule.id,
      oldValues,
      newValues: schedule.$attributes,
    })

    return schedule
  }

  private async syncProcessRecordFromSchedule(schedule: MaintenanceSchedule, audit?: AuditContext) {
    const record = await MaintenanceRecord.query()
      .where('maintenance_schedule_id', schedule.id)
      .first()

    if (!record) {
      return
    }

    const oldValues = { ...record.$attributes }

    record.merge({
      performedBy: record.performedBy ?? schedule.assignedTechnicianId,
      priority: schedule.priority,
      scheduledDate: schedule.scheduledFor,
      status: schedule.status,
      updatedBy: audit?.userId ?? schedule.updatedBy,
    })
    await record.save()

    await this.auditService.record({
      ...audit,
      action: 'maintenance_record.updated',
      entityType: 'maintenance_record',
      entityId: record.id,
      oldValues,
      newValues: record.$attributes,
    })
  }

  private async ensureProcessRecord(schedule: MaintenanceSchedule, audit?: AuditContext) {
    const existingRecord = await MaintenanceRecord.query()
      .where('maintenance_schedule_id', schedule.id)
      .first()

    if (existingRecord) {
      if (existingRecord.status !== 'in_progress') {
        const oldValues = { ...existingRecord.$attributes }

        existingRecord.merge({
          currentStage: existingRecord.currentStage ?? 'reception',
          performedBy: existingRecord.performedBy ?? schedule.assignedTechnicianId,
          status: 'in_progress',
          updatedBy: audit?.userId ?? schedule.updatedBy,
        })
        await existingRecord.save()

        await this.auditService.record({
          ...audit,
          action: 'maintenance_record.updated',
          entityType: 'maintenance_record',
          entityId: existingRecord.id,
          oldValues,
          newValues: existingRecord.$attributes,
        })
      }

      return existingRecord
    }

    return db.transaction(async (trx) => {
      const record = await MaintenanceRecord.create(
        {
          currentStage: 'reception',
          description: schedule.notes,
          equipmentId: schedule.equipmentId,
          maintenanceScheduleId: schedule.id,
          maintenanceType: schedule.maintenanceType,
          performedBy: schedule.assignedTechnicianId,
          priority: schedule.priority,
          scheduledDate: schedule.scheduledFor,
          status: 'in_progress',
          createdBy: audit?.userId ?? schedule.createdBy,
          updatedBy: audit?.userId ?? schedule.updatedBy,
        },
        { client: trx }
      )

      const equipment = await Equipment.query({ client: trx })
        .where('id', schedule.equipmentId)
        .whereNull('deleted_at')
        .first()

      if (equipment) {
        equipment.useTransaction(trx)
        equipment.status = 'in_maintenance'
        await equipment.save()
      }

      await this.auditService.record({
        ...audit,
        action: 'maintenance_record.created',
        entityType: 'maintenance_record',
        entityId: record.id,
        newValues: record.$attributes,
      })

      return record
    })
  }

  private async validate(payload: MaintenanceSchedulePayload) {
    const errors: MaintenanceValidationErrors = {}

    await Promise.all([
      this.ensureEquipment(errors, payload.equipmentId),
      this.ensureUser(errors, 'assignedTechnicianId', payload.assignedTechnicianId),
    ])

    if (Object.keys(errors).length > 0) {
      throw new MaintenanceScheduleValidationError(errors)
    }
  }

  private async ensureEquipment(errors: MaintenanceValidationErrors, equipmentId?: string | null) {
    if (!equipmentId) {
      this.addError(errors, 'equipmentId', 'Equipment is required')
      return
    }

    const equipment = await Equipment.query()
      .where('id', equipmentId)
      .whereNull('deleted_at')
      .first()

    if (!equipment) {
      this.addError(errors, 'equipmentId', 'Equipment does not exist')
    }
  }

  private async ensureUser(
    errors: MaintenanceValidationErrors,
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

  private addError(errors: MaintenanceValidationErrors, field: string, message: string) {
    errors[field] = [...(errors[field] ?? []), message]
  }
}

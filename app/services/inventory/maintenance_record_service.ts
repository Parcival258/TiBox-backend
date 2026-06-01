import Equipment from '#models/equipment'
import MaintenanceRecord from '#models/maintenance_record'
import MaintenanceSchedule from '#models/maintenance_schedule'
import User from '#models/user'
import AuditService, { type AuditContext } from '#services/audit/audit_service'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

type MaintenanceRecordPayload = Omit<Partial<MaintenanceRecord>, 'cost'> & {
  cost?: number | string | null
}

type ListMaintenanceRecordFilters = {
  equipmentId?: string
  maintenanceScheduleId?: string
  maintenanceType?: string
  page?: number
  performedBy?: string
  performedFrom?: DateTime
  performedTo?: DateTime
  perPage?: number
  priority?: string
  status?: string
}

type MaintenanceValidationErrors = Record<string, string[]>

export class MaintenanceRecordValidationError extends Error {
  constructor(public errors: MaintenanceValidationErrors) {
    super('Maintenance record validation failed')
  }
}

export default class MaintenanceRecordService {
  private auditService = new AuditService()

  list(filters: ListMaintenanceRecordFilters) {
    const query = MaintenanceRecord.query()
      .preload('equipment')
      .preload('maintenanceSchedule')
      .preload('performer')
      .orderBy('performed_at', 'desc')
      .orderBy('scheduled_date', 'desc')

    if (filters.equipmentId) {
      query.where('equipment_id', filters.equipmentId)
    }

    if (filters.maintenanceScheduleId) {
      query.where('maintenance_schedule_id', filters.maintenanceScheduleId)
    }

    if (filters.performedBy) {
      query.where('performed_by', filters.performedBy)
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

    if (filters.performedFrom) {
      query.where('performed_at', '>=', filters.performedFrom.toSQL()!)
    }

    if (filters.performedTo) {
      query.where('performed_at', '<=', filters.performedTo.toSQL()!)
    }

    return query.paginate(filters.page ?? 1, filters.perPage ?? 20)
  }

  find(id: string) {
    return MaintenanceRecord.query()
      .where('id', id)
      .preload('equipment')
      .preload('maintenanceSchedule')
      .preload('performer')
      .first()
  }

  async create(payload: MaintenanceRecordPayload, audit?: AuditContext) {
    await this.validate(payload)

    return db.transaction(async (trx) => {
      const record = await MaintenanceRecord.create(
        {
          ...payload,
          status: payload.status ?? 'pending',
          priority: payload.priority ?? 'medium',
          cost: payload.cost === undefined || payload.cost === null ? null : String(payload.cost),
          createdBy: audit?.userId ?? payload.createdBy,
          updatedBy: audit?.userId ?? payload.updatedBy,
        },
        { client: trx }
      )

      await this.syncOperationalState(record, trx)

      await this.auditService.record({
        ...audit,
        action: 'maintenance_record.created',
        entityType: 'maintenance_record',
        entityId: record.id,
        newValues: record.$attributes,
      })

      return this.find(record.id)
    })
  }

  async update(id: string, payload: MaintenanceRecordPayload, audit?: AuditContext) {
    const record = await MaintenanceRecord.find(id)

    if (!record) {
      return null
    }

    await this.validate({
      ...record.$attributes,
      ...payload,
    })

    return db.transaction(async (trx) => {
      const oldValues = { ...record.$attributes }

      record.useTransaction(trx)
      record.merge({
        ...payload,
        cost:
          payload.cost === undefined || payload.cost === null ? record.cost : String(payload.cost),
        updatedBy: audit?.userId ?? payload.updatedBy,
      })
      await record.save()

      await this.syncOperationalState(record, trx)

      await this.auditService.record({
        ...audit,
        action: 'maintenance_record.updated',
        entityType: 'maintenance_record',
        entityId: record.id,
        oldValues,
        newValues: record.$attributes,
      })

      return this.find(record.id)
    })
  }

  close(id: string, payload: MaintenanceRecordPayload, audit?: AuditContext) {
    return this.update(
      id,
      {
        ...payload,
        status: 'completed',
        performedAt: payload.performedAt ?? DateTime.local(),
      },
      audit
    )
  }

  private async syncOperationalState(record: MaintenanceRecord, trx: TransactionClientContract) {
    const equipment = await Equipment.query({ client: trx })
      .where('id', record.equipmentId)
      .whereNull('deleted_at')
      .first()

    if (!equipment) {
      return
    }

    equipment.useTransaction(trx)

    if (record.status === 'completed') {
      equipment.status = 'active'
      equipment.lastMaintenanceAt = record.performedAt ?? DateTime.local()
      equipment.nextMaintenanceAt = record.nextMaintenanceAt
    } else if (record.status === 'in_progress') {
      equipment.status = 'in_maintenance'
    }

    await equipment.save()

    if (record.maintenanceScheduleId) {
      const schedule = await MaintenanceSchedule.query({ client: trx })
        .where('id', record.maintenanceScheduleId)
        .first()

      if (schedule) {
        schedule.useTransaction(trx)
        schedule.status = record.status
        schedule.updatedBy = record.updatedBy
        await schedule.save()
      }
    }
  }

  private async validate(payload: MaintenanceRecordPayload) {
    const errors: MaintenanceValidationErrors = {}

    await Promise.all([
      this.ensureEquipment(errors, payload.equipmentId),
      this.ensureSchedule(errors, payload.equipmentId, payload.maintenanceScheduleId),
      this.ensureUser(errors, 'performedBy', payload.performedBy),
    ])

    if (Object.keys(errors).length > 0) {
      throw new MaintenanceRecordValidationError(errors)
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

  private async ensureSchedule(
    errors: MaintenanceValidationErrors,
    equipmentId?: string | null,
    scheduleId?: string | null
  ) {
    if (!scheduleId) {
      return
    }

    const schedule = await MaintenanceSchedule.query().where('id', scheduleId).first()

    if (!schedule) {
      this.addError(errors, 'maintenanceScheduleId', 'Maintenance schedule does not exist')
      return
    }

    if (equipmentId && schedule.equipmentId !== equipmentId) {
      this.addError(
        errors,
        'maintenanceScheduleId',
        'Maintenance schedule does not belong to the selected equipment'
      )
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

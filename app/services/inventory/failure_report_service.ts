import Equipment from '#models/equipment'
import FailureReport from '#models/failure_report'
import MaintenanceRecord from '#models/maintenance_record'
import User from '#models/user'
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
}

type FailureReportValidationErrors = Record<string, string[]>

export class FailureReportValidationError extends Error {
  constructor(public errors: FailureReportValidationErrors) {
    super('Failure report validation failed')
  }
}

export default class FailureReportService {
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

  find(id: string) {
    return FailureReport.query()
      .where('id', id)
      .preload('equipment')
      .preload('reporter')
      .preload('maintenanceRecord')
      .first()
  }

  async create(payload: FailureReportPayload, audit?: AuditContext) {
    await this.validate(payload)

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

  private async validate(payload: FailureReportPayload) {
    const errors: FailureReportValidationErrors = {}

    await Promise.all([
      this.ensureEquipment(errors, payload.equipmentId),
      this.ensureUser(errors, 'reportedBy', payload.reportedBy),
      this.ensureMaintenanceRecord(errors, payload.equipmentId, payload.maintenanceRecordId),
    ])

    if (Object.keys(errors).length > 0) {
      throw new FailureReportValidationError(errors)
    }
  }

  private async ensureEquipment(
    errors: FailureReportValidationErrors,
    equipmentId?: string | null
  ) {
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

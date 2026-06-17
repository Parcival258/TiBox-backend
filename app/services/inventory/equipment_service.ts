import Equipment from '#models/equipment'
import Headquarter from '#models/headquarter'
import Location from '#models/location'
import User from '#models/user'
import AuditService, { type AuditContext } from '#services/audit/audit_service'
import { DateTime } from 'luxon'

type EquipmentPayload = Partial<Equipment>

type ListEquipmentFilters = {
  search?: string
  status?: string
  type?: string
  brand?: string
  ownershipType?: string
  headquarterId?: string
  locationId?: string
  currentResponsibleId?: string
  secondaryResponsibleId?: string
  warrantyUntilBefore?: DateTime
  leaseUntilBefore?: DateTime
  page?: number
  perPage?: number
  orderBy?: string
  orderDirection?: 'asc' | 'desc'
  visibleToResponsibleId?: string
}

type EquipmentBusinessRulesPayload = EquipmentPayload & {
  id?: string
}

type EquipmentValidationErrors = Record<string, string[]>

const orderColumns: Record<string, string> = {
  brand: 'brand',
  createdAt: 'created_at',
  internalCode: 'internal_code',
  leaseUntil: 'lease_until',
  serial: 'serial',
  status: 'status',
  type: 'type',
  warrantyUntil: 'warranty_until',
}

export class EquipmentValidationError extends Error {
  constructor(public errors: EquipmentValidationErrors) {
    super('Equipment validation failed')
  }
}

export default class EquipmentService {
  private auditService = new AuditService()

  async list(filters: ListEquipmentFilters) {
    const page = filters.page ?? 1
    const perPage = filters.perPage ?? 20
    const orderBy = orderColumns[filters.orderBy ?? 'createdAt']
    const orderDirection = filters.orderDirection ?? 'desc'

    const query = Equipment.query()
      .preload('headquarter')
      .preload('location')
      .preload('currentResponsible')
      .preload('secondaryResponsible')
      .orderBy(orderBy, orderDirection)

    if (filters.status === 'retired') {
      query.whereNotNull('deleted_at')
    } else {
      query.whereNull('deleted_at')
    }

    if (filters.visibleToResponsibleId) {
      const responsibleId = filters.visibleToResponsibleId

      query.where((builder) => {
        builder
          .where('current_responsible_id', responsibleId)
          .orWhere('secondary_responsible_id', responsibleId)
      })
    }

    if (filters.status && filters.status !== 'retired') {
      query.where('status', filters.status)
    }

    if (filters.type) {
      query.whereILike('type', `%${filters.type}%`)
    }

    if (filters.brand) {
      query.whereILike('brand', `%${filters.brand}%`)
    }

    if (filters.ownershipType) {
      query.where('ownership_type', filters.ownershipType)
    }

    if (filters.headquarterId) {
      query.where('headquarter_id', filters.headquarterId)
    }

    if (filters.locationId) {
      query.where('location_id', filters.locationId)
    }

    if (filters.currentResponsibleId) {
      query.where('current_responsible_id', filters.currentResponsibleId)
    }

    if (filters.secondaryResponsibleId) {
      query.where('secondary_responsible_id', filters.secondaryResponsibleId)
    }

    if (filters.warrantyUntilBefore) {
      query.where('warranty_until', '<=', filters.warrantyUntilBefore.toSQLDate()!)
    }

    if (filters.leaseUntilBefore) {
      query.where('lease_until', '<=', filters.leaseUntilBefore.toSQLDate()!)
    }

    if (filters.search) {
      query.where((builder) => {
        builder
          .whereILike('internal_code', `%${filters.search}%`)
          .orWhereILike('serial', `%${filters.search}%`)
          .orWhereILike('asset_tag', `%${filters.search}%`)
          .orWhereILike('brand', `%${filters.search}%`)
          .orWhereILike('model', `%${filters.search}%`)
          .orWhereILike('ip_addresses', `%${filters.search}%`)
          .orWhereILike('mac_address', `%${filters.search}%`)
          .orWhereILike('processor', `%${filters.search}%`)
          .orWhereILike('storage_type', `%${filters.search}%`)
      })
    }

    const result = await query.paginate(page, perPage)

    if (filters.status === 'retired') {
      result.all().forEach((equipment) => {
        equipment.status = 'retired'
      })
    }

    return result
  }

  async create(payload: EquipmentPayload, audit?: AuditContext) {
    await this.validateBusinessRules(payload)

    const equipment = await Equipment.create({
      ...payload,
      createdBy: audit?.userId ?? payload.createdBy,
      updatedBy: audit?.userId ?? payload.updatedBy,
    })

    await this.auditService.record({
      ...audit,
      action: 'equipment.created',
      entityType: 'equipment',
      entityId: equipment.id,
      newValues: equipment.$attributes,
    })

    return equipment
  }

  async findDetails(id: string, visibleToResponsibleId?: string) {
    const query = Equipment.query()
      .where('id', id)
      .preload('headquarter')
      .preload('location')
      .preload('currentResponsible')
      .preload('secondaryResponsible')
      .preload('assignments')
      .preload('maintenanceSchedules')
      .preload('maintenanceRecords')

    if (visibleToResponsibleId) {
      query.where((builder) => {
        builder
          .where('current_responsible_id', visibleToResponsibleId)
          .orWhere('secondary_responsible_id', visibleToResponsibleId)
      })
    }

    const equipment = await query.first()

    if (equipment?.deletedAt) {
      equipment.status = 'retired'
    }

    return equipment
  }

  findActive(id: string) {
    return Equipment.query().where('id', id).whereNull('deleted_at').first()
  }

  findRetired(id: string) {
    return Equipment.query().where('id', id).whereNotNull('deleted_at').first()
  }

  async update(id: string, payload: EquipmentPayload, audit?: AuditContext) {
    const equipment = await this.findActive(id)

    if (!equipment) {
      return null
    }

    const oldValues = { ...equipment.$attributes }

    await this.validateBusinessRules(
      {
        ...equipment.$attributes,
        ...payload,
        id: equipment.id,
      },
      equipment.id
    )

    equipment.merge({
      ...payload,
      updatedBy: audit?.userId ?? payload.updatedBy,
    })
    await equipment.save()

    await this.auditService.record({
      ...audit,
      action: 'equipment.updated',
      entityType: 'equipment',
      entityId: equipment.id,
      oldValues,
      newValues: equipment.$attributes,
    })

    return equipment
  }

  async softDelete(id: string, audit?: AuditContext) {
    const equipment = await this.findActive(id)

    if (!equipment) {
      return null
    }

    const oldValues = { ...equipment.$attributes }

    equipment.status = 'retired'
    equipment.deletedAt = DateTime.local()
    await equipment.save()

    await this.auditService.record({
      ...audit,
      action: 'equipment.deleted',
      entityType: 'equipment',
      entityId: equipment.id,
      oldValues,
      newValues: {
        ...equipment.$attributes,
        deletedAt: equipment.deletedAt,
      },
    })

    return equipment
  }

  async restore(id: string, audit?: AuditContext) {
    const equipment = await this.findRetired(id)

    if (!equipment) {
      return null
    }

    const oldValues = { ...equipment.$attributes }

    equipment.status = 'active'
    equipment.deletedAt = null
    equipment.updatedBy = audit?.userId ?? equipment.updatedBy
    await equipment.save()

    await this.auditService.record({
      ...audit,
      action: 'equipment.restored',
      entityType: 'equipment',
      entityId: equipment.id,
      oldValues,
      newValues: equipment.$attributes,
    })

    return equipment
  }

  private async validateBusinessRules(payload: EquipmentBusinessRulesPayload, ignoreId?: string) {
    const errors: EquipmentValidationErrors = {}

    await Promise.all([
      this.ensureUnique(errors, 'internalCode', 'internal_code', payload.internalCode, ignoreId),
      this.ensureUnique(errors, 'serial', 'serial', payload.serial, ignoreId),
      this.ensureUnique(errors, 'assetTag', 'asset_tag', payload.assetTag, ignoreId),
      this.ensureExists(errors, 'headquarterId', Headquarter, payload.headquarterId),
      this.ensureExists(errors, 'locationId', Location, payload.locationId),
      this.ensureExists(errors, 'currentResponsibleId', User, payload.currentResponsibleId),
      this.ensureExists(errors, 'secondaryResponsibleId', User, payload.secondaryResponsibleId),
    ])

    if (payload.headquarterId && payload.locationId) {
      const location = await Location.query()
        .where('id', payload.locationId)
        .where('headquarter_id', payload.headquarterId)
        .first()

      if (!location) {
        this.addError(errors, 'locationId', 'Location does not belong to the selected headquarter')
      }
    }

    if (payload.ownershipType === 'leased') {
      if (!payload.leaseProvider) {
        this.addError(errors, 'leaseProvider', 'Lease provider is required for leased equipment')
      }

      if (!payload.leaseContractNumber) {
        this.addError(
          errors,
          'leaseContractNumber',
          'Lease contract number is required for leased equipment'
        )
      }

      if (!payload.leaseUntil) {
        this.addError(errors, 'leaseUntil', 'Lease end date is required for leased equipment')
      }
    }

    if (Object.keys(errors).length > 0) {
      throw new EquipmentValidationError(errors)
    }
  }

  private async ensureUnique(
    errors: EquipmentValidationErrors,
    field: string,
    column: string,
    value?: string | null,
    ignoreId?: string
  ) {
    if (!value) {
      return
    }

    const query = Equipment.query().where(column, value)

    if (ignoreId) {
      query.whereNot('id', ignoreId)
    }

    const exists = await query.first()

    if (exists) {
      this.addError(errors, field, `${field} is already in use`)
    }
  }

  private async ensureExists(
    errors: EquipmentValidationErrors,
    field: string,
    model: typeof Headquarter | typeof Location | typeof User,
    value?: string | null
  ) {
    if (!value) {
      return
    }

    const exists = await model.query().where('id', value).first()

    if (!exists) {
      this.addError(errors, field, `${field} does not exist`)
    }
  }

  private addError(errors: EquipmentValidationErrors, field: string, message: string) {
    errors[field] = [...(errors[field] ?? []), message]
  }
}

import Equipment from '#models/equipment'
import EquipmentGroup from '#models/equipment_group'
import AuditService, { type AuditContext } from '#services/audit/audit_service'

type EquipmentGroupPayload = {
  description?: string | null
  equipmentIds?: string[]
  name?: string
}

type EquipmentGroupValidationErrors = Record<string, string[]>

export class EquipmentGroupValidationError extends Error {
  constructor(public errors: EquipmentGroupValidationErrors) {
    super('Equipment group validation failed')
  }
}

export default class EquipmentGroupService {
  private auditService = new AuditService()

  list() {
    return EquipmentGroup.query().preload('equipment').orderBy('name', 'asc')
  }

  find(id: string) {
    return EquipmentGroup.query().where('id', id).preload('equipment').first()
  }

  async create(payload: EquipmentGroupPayload, audit?: AuditContext) {
    await this.validate(payload)

    const group = await EquipmentGroup.create({
      description: payload.description ?? null,
      name: payload.name!,
      createdBy: audit?.userId ?? null,
      updatedBy: audit?.userId ?? null,
    })

    if (payload.equipmentIds) {
      await group.related('equipment').sync(payload.equipmentIds)
    }

    await this.auditService.record({
      ...audit,
      action: 'equipment_group.created',
      entityType: 'equipment_group',
      entityId: group.id,
      newValues: { ...group.$attributes, equipmentIds: payload.equipmentIds ?? [] },
    })

    return this.find(group.id)
  }

  async update(id: string, payload: EquipmentGroupPayload, audit?: AuditContext) {
    const group = await EquipmentGroup.find(id)

    if (!group) {
      return null
    }

    await this.validate(payload)

    const oldValues = { ...group.$attributes }

    group.merge({
      ...(payload.description !== undefined ? { description: payload.description } : {}),
      ...(payload.name !== undefined ? { name: payload.name } : {}),
      updatedBy: audit?.userId ?? group.updatedBy,
    })
    await group.save()

    if (payload.equipmentIds) {
      await group.related('equipment').sync(payload.equipmentIds)
    }

    await this.auditService.record({
      ...audit,
      action: 'equipment_group.updated',
      entityType: 'equipment_group',
      entityId: group.id,
      oldValues,
      newValues: { ...group.$attributes, equipmentIds: payload.equipmentIds },
    })

    return this.find(group.id)
  }

  async delete(id: string, audit?: AuditContext) {
    const group = await EquipmentGroup.find(id)

    if (!group) {
      return null
    }

    const oldValues = { ...group.$attributes }
    await group.delete()

    await this.auditService.record({
      ...audit,
      action: 'equipment_group.deleted',
      entityType: 'equipment_group',
      entityId: group.id,
      oldValues,
    })

    return group
  }

  async attachEquipment(id: string, equipmentId: string, audit?: AuditContext) {
    const group = await this.findGroup(id)
    await this.ensureEquipment(equipmentId)
    await group.related('equipment').attach([equipmentId])

    await this.auditService.record({
      ...audit,
      action: 'equipment_group.equipment_attached',
      entityType: 'equipment_group',
      entityId: group.id,
      newValues: { equipmentId },
    })

    return this.find(group.id)
  }

  async detachEquipment(id: string, equipmentId: string, audit?: AuditContext) {
    const group = await this.findGroup(id)
    await group.related('equipment').detach([equipmentId])

    await this.auditService.record({
      ...audit,
      action: 'equipment_group.equipment_detached',
      entityType: 'equipment_group',
      entityId: group.id,
      oldValues: { equipmentId },
    })

    return this.find(group.id)
  }

  private async validate(payload: EquipmentGroupPayload) {
    const errors: EquipmentGroupValidationErrors = {}

    if (payload.equipmentIds) {
      await Promise.all(payload.equipmentIds.map((equipmentId) => this.ensureEquipment(equipmentId, errors)))
    }

    if (Object.keys(errors).length > 0) {
      throw new EquipmentGroupValidationError(errors)
    }
  }

  private async findGroup(id: string) {
    const group = await EquipmentGroup.find(id)

    if (!group) {
      throw new EquipmentGroupValidationError({ id: ['Equipment group does not exist'] })
    }

    return group
  }

  private async ensureEquipment(equipmentId: string, errors?: EquipmentGroupValidationErrors) {
    const equipment = await Equipment.query()
      .where('id', equipmentId)
      .whereNull('deleted_at')
      .first()

    if (!equipment) {
      if (errors) {
        errors.equipmentIds = [...(errors.equipmentIds ?? []), `${equipmentId} does not exist`]
        return
      }

      throw new EquipmentGroupValidationError({ equipmentId: ['Equipment does not exist'] })
    }
  }
}

import Equipment from '#models/equipment'
import EquipmentType from '#models/equipment_type'

type EquipmentTypePayload = Partial<EquipmentType>

export default class EquipmentTypeService {
  list() {
    return EquipmentType.query().orderBy('name', 'asc')
  }

  create(payload: EquipmentTypePayload) {
    return EquipmentType.create(payload)
  }

  find(id: string) {
    return EquipmentType.find(id)
  }

  async update(id: string, payload: EquipmentTypePayload) {
    const equipmentType = await this.find(id)

    if (!equipmentType) {
      return null
    }

    const previousName = equipmentType.name
    equipmentType.merge(payload)
    await equipmentType.save()

    if (payload.name && payload.name !== previousName) {
      await Equipment.query().where('type', previousName).update({ type: payload.name })
    }

    return equipmentType
  }

  async deactivate(id: string) {
    return this.update(id, { isActive: false })
  }
}

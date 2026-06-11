import EquipmentTypeService from '#services/inventory/equipment_type_service'
import { equipmentTypeValidator } from '#validators/equipment_type'
import type { HttpContext } from '@adonisjs/core/http'

export default class EquipmentTypesController {
  private equipmentTypeService = new EquipmentTypeService()

  index() {
    return this.equipmentTypeService.list()
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(equipmentTypeValidator)
    return response.created(await this.equipmentTypeService.create(payload))
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(equipmentTypeValidator)
    const equipmentType = await this.equipmentTypeService.update(params.id, payload)

    if (!equipmentType) {
      return response.notFound({ message: 'Equipment type not found' })
    }

    return equipmentType
  }

  async destroy({ params, response }: HttpContext) {
    const equipmentType = await this.equipmentTypeService.deactivate(params.id)

    if (!equipmentType) {
      return response.notFound({ message: 'Equipment type not found' })
    }

    return response.noContent()
  }
}

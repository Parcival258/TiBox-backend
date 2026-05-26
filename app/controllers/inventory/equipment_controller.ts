import EquipmentService, { EquipmentValidationError } from '#services/inventory/equipment_service'
import {
  createEquipmentValidator,
  listEquipmentValidator,
  updateEquipmentValidator,
} from '#validators/equipment'
import type { HttpContext } from '@adonisjs/core/http'

export default class EquipmentController {
  private equipmentService = new EquipmentService()

  async index({ request }: HttpContext) {
    const filters = await request.validateUsing(listEquipmentValidator)

    return this.equipmentService.list(filters)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createEquipmentValidator)

    try {
      const equipment = await this.equipmentService.create(payload)

      return response.created(equipment)
    } catch (error) {
      if (error instanceof EquipmentValidationError) {
        return response.unprocessableEntity({
          message: error.message,
          errors: error.errors,
        })
      }

      throw error
    }
  }

  async show({ params, response }: HttpContext) {
    const equipment = await this.equipmentService.findDetails(params.id)

    if (!equipment) {
      return response.notFound({ message: 'Equipment not found' })
    }

    return equipment
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateEquipmentValidator)

    try {
      const equipment = await this.equipmentService.update(params.id, payload)

      if (!equipment) {
        return response.notFound({ message: 'Equipment not found' })
      }

      return equipment
    } catch (error) {
      if (error instanceof EquipmentValidationError) {
        return response.unprocessableEntity({
          message: error.message,
          errors: error.errors,
        })
      }

      throw error
    }
  }

  async destroy({ params, response }: HttpContext) {
    const equipment = await this.equipmentService.softDelete(params.id)

    if (!equipment) {
      return response.notFound({ message: 'Equipment not found' })
    }

    return response.noContent()
  }
}

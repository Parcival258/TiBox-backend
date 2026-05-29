import EquipmentService, { EquipmentValidationError } from '#services/inventory/equipment_service'
import EquipmentLifeSheetService from '#services/inventory/equipment_life_sheet_service'
import {
  createEquipmentValidator,
  listEquipmentValidator,
  updateEquipmentValidator,
} from '#validators/equipment'
import type { HttpContext } from '@adonisjs/core/http'

export default class EquipmentController {
  private equipmentService = new EquipmentService()
  private lifeSheetService = new EquipmentLifeSheetService()

  async index({ request }: HttpContext) {
    const filters = await request.validateUsing(listEquipmentValidator)

    return this.equipmentService.list(filters)
  }

  async store({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createEquipmentValidator)

    try {
      const equipment = await this.equipmentService.create(
        payload,
        this.auditContext({ auth, request })
      )

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

  async lifeSheet({ params, response }: HttpContext) {
    const lifeSheet = await this.lifeSheetService.getByEquipmentId(params.id)

    if (!lifeSheet) {
      return response.notFound({ message: 'Equipment not found' })
    }

    return lifeSheet
  }

  async update({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateEquipmentValidator)

    try {
      const equipment = await this.equipmentService.update(
        params.id,
        payload,
        this.auditContext({ auth, request })
      )

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

  async destroy({ auth, params, request, response }: HttpContext) {
    const equipment = await this.equipmentService.softDelete(
      params.id,
      this.auditContext({ auth, request })
    )

    if (!equipment) {
      return response.notFound({ message: 'Equipment not found' })
    }

    return response.noContent()
  }

  private auditContext({ auth, request }: Pick<HttpContext, 'auth' | 'request'>) {
    return {
      userId: auth.isAuthenticated ? auth.getUserOrFail().id : null,
      ipAddress: request.ip(),
      userAgent: request.header('user-agent') ?? null,
    }
  }
}

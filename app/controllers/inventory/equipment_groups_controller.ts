import EquipmentGroupService, {
  EquipmentGroupValidationError,
} from '#services/inventory/equipment_group_service'
import {
  createEquipmentGroupValidator,
  equipmentGroupEquipmentValidator,
  updateEquipmentGroupValidator,
} from '#validators/equipment_group'
import type { HttpContext } from '@adonisjs/core/http'

export default class EquipmentGroupsController {
  private equipmentGroupService = new EquipmentGroupService()

  index() {
    return this.equipmentGroupService.list()
  }

  async show({ params, response }: HttpContext) {
    const group = await this.equipmentGroupService.find(params.id)

    if (!group) {
      return response.notFound({ message: 'Equipment group not found' })
    }

    return group
  }

  async store({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createEquipmentGroupValidator)

    try {
      const group = await this.equipmentGroupService.create(
        payload,
        this.auditContext({ auth, request })
      )

      return response.created(group)
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  async update({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateEquipmentGroupValidator)

    try {
      const group = await this.equipmentGroupService.update(
        params.id,
        payload,
        this.auditContext({ auth, request })
      )

      if (!group) {
        return response.notFound({ message: 'Equipment group not found' })
      }

      return group
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  async destroy({ auth, params, request, response }: HttpContext) {
    const group = await this.equipmentGroupService.delete(
      params.id,
      this.auditContext({ auth, request })
    )

    if (!group) {
      return response.notFound({ message: 'Equipment group not found' })
    }

    return response.noContent()
  }

  async attachEquipment({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(equipmentGroupEquipmentValidator)

    try {
      return await this.equipmentGroupService.attachEquipment(
        params.id,
        payload.equipmentId,
        this.auditContext({ auth, request })
      )
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  async detachEquipment({ auth, params, request, response }: HttpContext) {
    try {
      return await this.equipmentGroupService.detachEquipment(
        params.id,
        params.equipment_id,
        this.auditContext({ auth, request })
      )
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  private auditContext({ auth, request }: Pick<HttpContext, 'auth' | 'request'>) {
    return {
      userId: auth.isAuthenticated ? auth.getUserOrFail().id : null,
      ipAddress: request.ip(),
      userAgent: request.header('user-agent') ?? null,
    }
  }

  private handleValidationError(error: unknown, response: HttpContext['response']) {
    if (error instanceof EquipmentGroupValidationError) {
      return response.unprocessableEntity({
        message: error.message,
        errors: error.errors,
      })
    }

    throw error
  }
}

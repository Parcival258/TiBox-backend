import EquipmentAssignmentService, {
  EquipmentAssignmentError,
} from '#services/inventory/equipment_assignment_service'
import {
  assignEquipmentValidator,
  returnEquipmentValidator,
} from '#validators/equipment_assignment'
import type { HttpContext } from '@adonisjs/core/http'

export default class EquipmentAssignmentsController {
  private assignmentService = new EquipmentAssignmentService()

  async index({ params, response }: HttpContext) {
    try {
      return await this.assignmentService.listByEquipment(params.equipment_id)
    } catch (error) {
      if (error instanceof EquipmentAssignmentError) {
        return response.status(error.status).send({ message: error.message })
      }

      throw error
    }
  }

  async store({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(assignEquipmentValidator)
    const assignedBy = auth.isAuthenticated ? auth.getUserOrFail().id : null

    try {
      const assignment = await this.assignmentService.assign(params.equipment_id, {
        ...payload,
        assignedBy,
        audit: this.auditContext({ auth, request }),
      })

      return response.created(assignment)
    } catch (error) {
      if (error instanceof EquipmentAssignmentError) {
        return response.status(error.status).send({ message: error.message })
      }

      throw error
    }
  }

  async returnCurrent({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(returnEquipmentValidator)

    try {
      return await this.assignmentService.returnCurrent(params.equipment_id, {
        ...payload,
        audit: this.auditContext({ auth, request }),
      })
    } catch (error) {
      if (error instanceof EquipmentAssignmentError) {
        return response.status(error.status).send({ message: error.message })
      }

      throw error
    }
  }

  private auditContext({ auth, request }: Pick<HttpContext, 'auth' | 'request'>) {
    return {
      userId: auth.isAuthenticated ? auth.getUserOrFail().id : null,
      ipAddress: request.ip(),
      userAgent: request.header('user-agent') ?? null,
    }
  }
}

import MaintenanceRecordService, {
  MaintenanceRecordValidationError,
} from '#services/inventory/maintenance_record_service'
import {
  closeMaintenanceRecordValidator,
  createMaintenanceRecordValidator,
  listMaintenanceRecordValidator,
  updateMaintenanceClosureValidator,
  updateMaintenanceExecutionValidator,
  updateMaintenanceReceptionValidator,
  updateMaintenanceRecordValidator,
} from '#validators/maintenance'
import type { HttpContext } from '@adonisjs/core/http'

export default class MaintenanceRecordsController {
  private maintenanceRecordService = new MaintenanceRecordService()

  async index({ request }: HttpContext) {
    const filters = await request.validateUsing(listMaintenanceRecordValidator)

    return this.maintenanceRecordService.list(filters)
  }

  async store({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createMaintenanceRecordValidator)

    try {
      const record = await this.maintenanceRecordService.create(
        payload,
        this.auditContext({ auth, request })
      )

      return response.created(record)
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  async show({ params, response }: HttpContext) {
    const record = await this.maintenanceRecordService.find(params.id)

    if (!record) {
      return response.notFound({ message: 'Maintenance record not found' })
    }

    return record
  }

  async update({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateMaintenanceRecordValidator)

    try {
      const record = await this.maintenanceRecordService.update(
        params.id,
        payload,
        this.auditContext({ auth, request })
      )

      if (!record) {
        return response.notFound({ message: 'Maintenance record not found' })
      }

      return record
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  async close({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(closeMaintenanceRecordValidator)

    try {
      const record = await this.maintenanceRecordService.close(
        params.id,
        payload,
        this.auditContext({ auth, request })
      )

      if (!record) {
        return response.notFound({ message: 'Maintenance record not found' })
      }

      return record
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  async updateReception({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateMaintenanceReceptionValidator)

    try {
      const record = await this.maintenanceRecordService.updateReception(
        params.id,
        payload,
        this.auditContext({ auth, request })
      )

      if (!record) {
        return response.notFound({ message: 'Maintenance record not found' })
      }

      return record
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  async updateExecution({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateMaintenanceExecutionValidator)

    try {
      const record = await this.maintenanceRecordService.updateExecution(
        params.id,
        payload,
        this.auditContext({ auth, request })
      )

      if (!record) {
        return response.notFound({ message: 'Maintenance record not found' })
      }

      return record
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  async updateClosure({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateMaintenanceClosureValidator)

    try {
      const record = await this.maintenanceRecordService.updateClosure(
        params.id,
        payload,
        this.auditContext({ auth, request })
      )

      if (!record) {
        return response.notFound({ message: 'Maintenance record not found' })
      }

      return record
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  async history({ params, response }: HttpContext) {
    try {
      return await this.maintenanceRecordService.history(params.id)
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  private handleValidationError(error: unknown, response: HttpContext['response']) {
    if (error instanceof MaintenanceRecordValidationError) {
      return response.unprocessableEntity({
        message: error.message,
        errors: error.errors,
      })
    }

    throw error
  }

  private auditContext({ auth, request }: Pick<HttpContext, 'auth' | 'request'>) {
    return {
      userId: auth.isAuthenticated ? auth.getUserOrFail().id : null,
      ipAddress: request.ip(),
      userAgent: request.header('user-agent') ?? null,
    }
  }
}

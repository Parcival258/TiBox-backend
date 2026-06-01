import MaintenanceScheduleService, {
  MaintenanceScheduleValidationError,
} from '#services/inventory/maintenance_schedule_service'
import {
  createMaintenanceScheduleValidator,
  listMaintenanceScheduleValidator,
  rescheduleMaintenanceScheduleValidator,
  updateMaintenanceScheduleValidator,
} from '#validators/maintenance'
import type { HttpContext } from '@adonisjs/core/http'

export default class MaintenanceSchedulesController {
  private maintenanceScheduleService = new MaintenanceScheduleService()

  async index({ request }: HttpContext) {
    const filters = await request.validateUsing(listMaintenanceScheduleValidator)

    return this.maintenanceScheduleService.list(filters)
  }

  async catalogs() {
    return this.maintenanceScheduleService.catalogs()
  }

  async store({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createMaintenanceScheduleValidator)

    try {
      const schedule = await this.maintenanceScheduleService.create(
        payload,
        this.auditContext({ auth, request })
      )

      return response.created(schedule)
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  async show({ params, response }: HttpContext) {
    const schedule = await this.maintenanceScheduleService.find(params.id)

    if (!schedule) {
      return response.notFound({ message: 'Maintenance schedule not found' })
    }

    return schedule
  }

  async update({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateMaintenanceScheduleValidator)

    try {
      const schedule = await this.maintenanceScheduleService.update(
        params.id,
        payload,
        this.auditContext({ auth, request })
      )

      if (!schedule) {
        return response.notFound({ message: 'Maintenance schedule not found' })
      }

      return schedule
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  async cancel({ auth, params, request, response }: HttpContext) {
    const schedule = await this.maintenanceScheduleService.cancel(
      params.id,
      this.auditContext({ auth, request })
    )

    if (!schedule) {
      return response.notFound({ message: 'Maintenance schedule not found' })
    }

    return schedule
  }

  async markPending({ auth, params, request, response }: HttpContext) {
    const schedule = await this.maintenanceScheduleService.markPending(
      params.id,
      this.auditContext({ auth, request })
    )

    if (!schedule) {
      return response.notFound({ message: 'Maintenance schedule not found' })
    }

    return schedule
  }

  async start({ auth, params, request, response }: HttpContext) {
    const schedule = await this.maintenanceScheduleService.start(
      params.id,
      this.auditContext({ auth, request })
    )

    if (!schedule) {
      return response.notFound({ message: 'Maintenance schedule not found' })
    }

    return schedule
  }

  async finish({ auth, params, request, response }: HttpContext) {
    const schedule = await this.maintenanceScheduleService.finish(
      params.id,
      this.auditContext({ auth, request })
    )

    if (!schedule) {
      return response.notFound({ message: 'Maintenance schedule not found' })
    }

    return schedule
  }

  async reschedule({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(rescheduleMaintenanceScheduleValidator)

    try {
      const schedule = await this.maintenanceScheduleService.reschedule(
        params.id,
        payload,
        this.auditContext({ auth, request })
      )

      if (!schedule) {
        return response.notFound({ message: 'Maintenance schedule not found' })
      }

      return schedule
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  private handleValidationError(error: unknown, response: HttpContext['response']) {
    if (error instanceof MaintenanceScheduleValidationError) {
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

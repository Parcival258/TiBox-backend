import AlertService from '#services/alerts/alert_service'
import {
  alertNoteValidator,
  assignAlertValidator,
  listAlertValidator,
  runAlertChecksValidator,
} from '#validators/alert'
import type { HttpContext } from '@adonisjs/core/http'

export default class AlertsController {
  private alertService = new AlertService()

  async index({ request }: HttpContext) {
    const filters = await request.validateUsing(listAlertValidator)

    return this.alertService.list(filters)
  }

  async catalogs() {
    return this.alertService.catalogs()
  }

  async runChecks({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(runAlertChecksValidator)
    const result = await this.alertService.runAutomaticChecks(
      payload.referenceDate,
      this.auditContext({ auth, request })
    )

    return response.created(result)
  }

  async acknowledge({ auth, params, request, response }: HttpContext) {
    const alert = await this.alertService.acknowledge(
      params.id,
      this.auditContext({ auth, request })
    )

    if (!alert) {
      return response.notFound({ message: 'Alert not found' })
    }

    return alert
  }

  async assign({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(assignAlertValidator)
    const alert = await this.alertService.assign(
      params.id,
      payload.assignedTo,
      this.auditContext({ auth, request })
    )

    if (!alert) {
      return response.notFound({ message: 'Alert or assignee not found' })
    }

    return alert
  }

  async selfAssign({ auth, params, request, response }: HttpContext) {
    const alert = await this.alertService.selfAssign(params.id, this.auditContext({ auth, request }))

    if (!alert) {
      return response.notFound({ message: 'Alert not found' })
    }

    return alert
  }

  async addNote({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(alertNoteValidator)
    const alert = await this.alertService.addNote(
      params.id,
      payload.note,
      this.auditContext({ auth, request })
    )

    if (!alert) {
      return response.notFound({ message: 'Alert not found' })
    }

    return alert
  }

  async resolve({ auth, params, request, response }: HttpContext) {
    const alert = await this.alertService.resolve(params.id, this.auditContext({ auth, request }))

    if (!alert) {
      return response.notFound({ message: 'Alert not found' })
    }

    return alert
  }

  async dismiss({ auth, params, request, response }: HttpContext) {
    const alert = await this.alertService.dismiss(params.id, this.auditContext({ auth, request }))

    if (!alert) {
      return response.notFound({ message: 'Alert not found' })
    }

    return alert
  }

  private auditContext({ auth, request }: Pick<HttpContext, 'auth' | 'request'>) {
    return {
      userId: auth.isAuthenticated ? auth.getUserOrFail().id : null,
      ipAddress: request.ip(),
      userAgent: request.header('user-agent') ?? null,
    }
  }
}

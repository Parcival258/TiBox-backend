import FailureReportService, {
  FailureReportValidationError,
} from '#services/inventory/failure_report_service'
import {
  closeFailureReportValidator,
  createFailureReportValidator,
  listFailureReportValidator,
  updateFailureReportValidator,
} from '#validators/failure_report'
import type { HttpContext } from '@adonisjs/core/http'

export default class FailureReportsController {
  private failureReportService = new FailureReportService()

  async index({ auth, request }: HttpContext) {
    const filters = await request.validateUsing(listFailureReportValidator)

    return this.failureReportService.list({
      ...filters,
      visibleToResponsibleId: await this.visibleToResponsibleId({ auth }),
    })
  }

  async store({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createFailureReportValidator)

    try {
      const report = await this.failureReportService.create(
        payload,
        this.auditContext({ auth, request }),
        {
          visibleToResponsibleId: await this.visibleToResponsibleId({ auth }),
        }
      )

      return response.created(report)
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  async show({ auth, params, response }: HttpContext) {
    const report = await this.failureReportService.find(params.id, {
      visibleToResponsibleId: await this.visibleToResponsibleId({ auth }),
    })

    if (!report) {
      return response.notFound({ message: 'Failure report not found' })
    }

    return report
  }

  async update({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateFailureReportValidator)

    try {
      const report = await this.failureReportService.update(
        params.id,
        payload,
        this.auditContext({ auth, request })
      )

      if (!report) {
        return response.notFound({ message: 'Failure report not found' })
      }

      return report
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  async close({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(closeFailureReportValidator)

    try {
      const report = await this.failureReportService.close(
        params.id,
        payload,
        this.auditContext({ auth, request })
      )

      if (!report) {
        return response.notFound({ message: 'Failure report not found' })
      }

      return report
    } catch (error) {
      return this.handleValidationError(error, response)
    }
  }

  private handleValidationError(error: unknown, response: HttpContext['response']) {
    if (error instanceof FailureReportValidationError) {
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

  private async visibleToResponsibleId({ auth }: Pick<HttpContext, 'auth'>) {
    const user = auth.getUserOrFail()

    await user.load('role')

    return user.role?.slug === 'user' ? user.id : undefined
  }
}

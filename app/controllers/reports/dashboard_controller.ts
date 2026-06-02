import DashboardService from '#services/reports/dashboard_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  private dashboardService = new DashboardService()

  async index({ auth }: HttpContext) {
    return this.dashboardService.summary({
      visibleToResponsibleId: await this.visibleToResponsibleId({ auth }),
    })
  }

  private async visibleToResponsibleId({ auth }: Pick<HttpContext, 'auth'>) {
    const user = auth.getUserOrFail()

    await user.load('role')

    return user.role?.slug === 'user' ? user.id : undefined
  }
}

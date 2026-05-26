import DashboardService from '#services/reports/dashboard_service'

export default class DashboardController {
  private dashboardService = new DashboardService()

  async index() {
    return this.dashboardService.summary()
  }
}

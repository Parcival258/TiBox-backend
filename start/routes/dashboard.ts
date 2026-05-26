import router from '@adonisjs/core/services/router'

const DashboardController = () => import('#controllers/reports/dashboard_controller')

export default function dashboardRoutes() {
  router.get('dashboard', [DashboardController, 'index']).as('dashboard.index')
}

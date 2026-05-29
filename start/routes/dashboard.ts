import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const DashboardController = () => import('#controllers/reports/dashboard_controller')

export default function dashboardRoutes() {
  router
    .get('dashboard', [DashboardController, 'index'])
    .use(middleware.auth())
    .use(middleware.permission({ permissions: ['equipment.view'] }))
    .as('dashboard.index')
}

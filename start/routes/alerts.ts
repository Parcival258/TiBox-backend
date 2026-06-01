import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AlertsController = () => import('#controllers/alerts/alerts_controller')

export default function alertRoutes() {
  router
    .group(() => {
      router
        .get('catalogs', [AlertsController, 'catalogs'])
        .use(middleware.permission({ permissions: ['alerts.view'] }))
        .as('catalogs')
      router
        .get('/', [AlertsController, 'index'])
        .use(middleware.permission({ permissions: ['alerts.view'] }))
        .as('index')
      router
        .post('run', [AlertsController, 'runChecks'])
        .use(middleware.permission({ permissions: ['alerts.manage'] }))
        .as('run')
      router
        .patch(':id/acknowledge', [AlertsController, 'acknowledge'])
        .use(middleware.permission({ permissions: ['alerts.view'] }))
        .as('acknowledge')
      router
        .patch(':id/resolve', [AlertsController, 'resolve'])
        .use(middleware.permission({ permissions: ['alerts.manage'] }))
        .as('resolve')
    })
    .prefix('alerts')
    .use(middleware.auth())
    .as('alerts')
}

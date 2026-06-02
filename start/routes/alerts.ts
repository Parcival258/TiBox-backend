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
        .patch(':id/assign', [AlertsController, 'assign'])
        .use(middleware.permission({ permissions: ['alerts.manage'] }))
        .as('assign')
      router
        .patch(':id/self-assign', [AlertsController, 'selfAssign'])
        .use(middleware.permission({ permissions: ['alerts.view'] }))
        .as('self_assign')
      router
        .patch(':id/note', [AlertsController, 'addNote'])
        .use(middleware.permission({ permissions: ['alerts.view'] }))
        .as('note')
      router
        .patch(':id/resolve', [AlertsController, 'resolve'])
        .use(middleware.permission({ permissions: ['alerts.manage'] }))
        .as('resolve')
      router
        .patch(':id/dismiss', [AlertsController, 'dismiss'])
        .use(middleware.permission({ permissions: ['alerts.view'] }))
        .as('dismiss')
    })
    .prefix('alerts')
    .use(middleware.auth())
    .as('alerts')
}

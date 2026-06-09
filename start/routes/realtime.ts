import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const RealtimeTokensController = () => import('#controllers/realtime/realtime_tokens_controller')

export default function realtimeRoutes() {
  router
    .group(() => {
      router
        .post('token', [RealtimeTokensController, 'store'])
        .use(middleware.permission({ mode: 'any', permissions: ['alerts.view', 'failure_reports.view'] }))
        .as('token')
    })
    .prefix('realtime')
    .use(middleware.auth())
    .as('realtime')
}

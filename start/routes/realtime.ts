import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { realtimeTokenThrottle } from '#start/limiter'

const RealtimeTokensController = () => import('#controllers/realtime/realtime_tokens_controller')

export default function realtimeRoutes() {
  router
    .group(() => {
      router
        .post('token', [RealtimeTokensController, 'store'])
        .use(realtimeTokenThrottle)
        .use(
          middleware.permission({
            mode: 'any',
            permissions: ['alerts.view', 'failure_reports.view', 'equipment.assign'],
          })
        )
        .as('token')
    })
    .prefix('realtime')
    .use(middleware.auth())
    .as('realtime')
}

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
        .as('token')
    })
    .prefix('realtime')
    .use(middleware.auth())
    .as('realtime')
}

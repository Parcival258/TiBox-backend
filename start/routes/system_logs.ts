import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const SystemLogsController = () => import('#controllers/system/system_logs_controller')

export default function systemLogRoutes() {
  router
    .group(() => {
      router.get('system-logs/errors', [SystemLogsController, 'errors'])
      router.delete('system-logs/errors', [SystemLogsController, 'clearErrors'])
      router.get('system-logs/settings', [SystemLogsController, 'settings'])
      router.patch('system-logs/settings', [SystemLogsController, 'updateSettings'])
    })
    .use(middleware.auth())
}

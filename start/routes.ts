import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'
import authRoutes from '#start/routes/auth'
import alertRoutes from '#start/routes/alerts'
import chatRoutes from '#start/routes/chat'
import dashboardRoutes from '#start/routes/dashboard'
import inventoryRoutes from '#start/routes/inventory'
import realtimeRoutes from '#start/routes/realtime'
import settingsRoutes from '#start/routes/settings'
import systemLogRoutes from '#start/routes/system_logs'
import userRoutes from '#start/routes/users'

router.get('/', () => {
  return { hello: 'world' }
})

router.get('/health', async () => {
  const result = await db.rawQuery('select 1 as ok')

  return {
    status: 'ok',
    database: result.rows[0]?.ok === 1 ? 'ok' : 'unknown',
  }
})

router
  .group(() => {
    authRoutes()
    alertRoutes()
    chatRoutes()
    dashboardRoutes()
    realtimeRoutes()
    settingsRoutes()
    systemLogRoutes()
    userRoutes()
    inventoryRoutes()
  })
  .prefix('/api/v1')

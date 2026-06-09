import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'
import authRoutes from '#start/routes/auth'
import alertRoutes from '#start/routes/alerts'
import dashboardRoutes from '#start/routes/dashboard'
import inventoryRoutes from '#start/routes/inventory'
import realtimeRoutes from '#start/routes/realtime'
import settingsRoutes from '#start/routes/settings'

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
    dashboardRoutes()
    realtimeRoutes()
    settingsRoutes()
    inventoryRoutes()
  })
  .prefix('/api/v1')

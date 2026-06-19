/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import limiter from '@adonisjs/limiter/services/main'

export const loginIpThrottle = limiter.define('login-ip', (ctx) => {
  return limiter
    .allowRequests(20)
    .every('10 minutes')
    .blockFor('15 minutes')
    .usingKey(ctx.request.ip())
    .limitExceeded((error) => {
      error.setMessage('Demasiados intentos de inicio de sesion. Intenta de nuevo mas tarde.')
    })
})

export const loginIdentityThrottle = limiter.define('login-identity', (ctx) => {
  const email = String(ctx.request.input('email', '')).trim().toLowerCase()
  const identityKey = email || 'missing-email'

  return limiter
    .allowRequests(5)
    .every('10 minutes')
    .blockFor('15 minutes')
    .usingKey(`${ctx.request.ip()}:${identityKey}`)
    .limitExceeded((error) => {
      error.setMessage('Demasiados intentos de inicio de sesion. Intenta de nuevo mas tarde.')
    })
})

export const realtimeTokenThrottle = limiter.define('realtime-token', (ctx) => {
  const key = ctx.auth.user?.id ?? ctx.request.ip()

  return limiter
    .allowRequests(30)
    .every('1 minute')
    .usingKey(key)
    .limitExceeded((error) => {
      error.setMessage('Demasiadas solicitudes de conexion en tiempo real.')
    })
})

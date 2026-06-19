import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { loginIdentityThrottle, loginIpThrottle } from '#start/limiter'

const SessionController = () => import('#controllers/auth/session_controller')
const NewAccountController = () => import('#controllers/auth/new_account_controller')
const ProfileController = () => import('#controllers/auth/profile_controller')

export default function authRoutes() {
  router
    .group(() => {
      router
        .post('signup', [NewAccountController, 'store'])
        .use(middleware.auth())
        .use(middleware.permission({ permissions: ['users.create'] }))
      router
        .post('login', [SessionController, 'login'])
        .use(loginIpThrottle)
        .use(loginIdentityThrottle)
      router.post('logout', [SessionController, 'logout']).use(middleware.auth())
    })
    .prefix('auth')
    .as('auth')

  router.get('me', [SessionController, 'me']).use(middleware.auth())
  router.get('auth/csrf', ({ request }) => ({ csrfToken: request.csrfToken }))
  router.get('account/profile', [ProfileController, 'show']).use(middleware.auth())
}

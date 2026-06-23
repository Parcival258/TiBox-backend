import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users/users_controller')

export default function userRoutes() {
  router
    .group(() => {
      router
        .get('users', [UsersController, 'index'])
        .use(middleware.permission({ permissions: ['users.update'] }))
      router
        .get('users/roles', [UsersController, 'roles'])
        .use(middleware.permission({ permissions: ['users.update'] }))
      router
        .post('users', [UsersController, 'store'])
        .use(middleware.permission({ permissions: ['users.create'] }))
      router
        .patch('users/:id', [UsersController, 'update'])
        .use(middleware.permission({ permissions: ['users.update'] }))
      router
        .patch('users/:id/reactivate', [UsersController, 'reactivate'])
        .use(middleware.permission({ permissions: ['users.update'] }))
      router
        .delete('users/:id', [UsersController, 'destroy'])
        .use(middleware.permission({ permissions: ['users.delete'] }))
    })
    .use(middleware.auth())
}

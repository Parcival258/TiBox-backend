import AuthorizationService from '#services/auth/authorization_service'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

type PermissionOptions = {
  mode?: 'all' | 'any'
  permissions: string[]
}

export default class PermissionMiddleware {
  private authorizationService = new AuthorizationService()

  async handle(ctx: HttpContext, next: NextFn, options: PermissionOptions) {
    const user = ctx.auth.getUserOrFail()
    const allowed =
      options.mode === 'any'
        ? await this.authorizationService.hasAnyPermission(user, options.permissions)
        : await this.authorizationService.hasEveryPermission(user, options.permissions)

    if (!allowed) {
      return ctx.response.forbidden({
        message: 'You do not have permission to perform this action',
      })
    }

    return next()
  }
}

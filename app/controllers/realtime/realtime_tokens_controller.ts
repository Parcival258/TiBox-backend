import AuthorizationService from '#services/auth/authorization_service'
import RealtimeTokenService from '#services/realtime/realtime_token_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class RealtimeTokensController {
  private authorizationService = new AuthorizationService()
  private tokenService = new RealtimeTokenService()

  async store({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const permissions = await this.authorizationService.getPermissionSlugs(user)

    return serialize({
      token: this.tokenService.create({
        permissions,
        roleSlug: user.role?.slug ?? null,
        userId: user.id,
      }),
    })
  }
}

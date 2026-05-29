import AuthorizationService from '#services/auth/authorization_service'
import UserTransformer from '#transformers/user_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  private authorizationService = new AuthorizationService()

  async show({ auth, serialize }: HttpContext) {
    const user = auth.use('web').getUserOrFail()
    await this.authorizationService.loadAccessProfile(user)

    return serialize({
      user: UserTransformer.transform(user),
    })
  }
}

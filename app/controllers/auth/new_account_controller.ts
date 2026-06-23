import AccountService from '#services/auth/account_service'
import AuthorizationService from '#services/auth/authorization_service'
import UserTransformer from '#transformers/user_transformer'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class NewAccountController {
  private accountService = new AccountService()
  private authorizationService = new AuthorizationService()

  async store({ request, response, serialize }: HttpContext) {
    const { name, email, password } = await request.validateUsing(signupValidator)

    const user = await this.accountService.register({ name, email, password })
    await this.authorizationService.loadAccessProfile(user)

    response.status(201)

    return serialize({
      user: UserTransformer.transform(user),
    })
  }
}

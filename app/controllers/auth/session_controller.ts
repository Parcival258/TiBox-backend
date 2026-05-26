import AccountService from '#services/auth/account_service'
import UserTransformer from '#transformers/user_transformer'
import { loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  private accountService = new AccountService()

  async login({ auth, request, response, serialize }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await this.accountService.validateLogin(email, password)

    if (!user) {
      return response.unauthorized({ message: 'User is inactive' })
    }

    await auth.use('web').login(user)

    return serialize({
      user: UserTransformer.transform(user),
    })
  }

  async me({ auth, serialize }: HttpContext) {
    const user = auth.use('web').getUserOrFail()

    return serialize({
      user: UserTransformer.transform(user),
    })
  }

  async logout({ auth }: HttpContext) {
    await auth.use('web').logout()

    return {
      message: 'Logged out successfully',
    }
  }
}

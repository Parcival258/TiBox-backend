import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class SessionController {
  async login({ auth, request, response, serialize }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    if (!user.isActive || user.deletedAt) {
      return response.unauthorized({ message: 'User is inactive' })
    }

    await auth.use('web').login(user)
    user.lastLoginAt = DateTime.local()
    await user.save()

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

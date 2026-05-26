import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class NewAccountController {
  async store({ request, response, serialize }: HttpContext) {
    const { name, email, password } = await request.validateUsing(signupValidator)

    const user = await User.create({ name, email, password })

    return response.created(
      serialize({
        user: UserTransformer.transform(user),
      })
    )
  }
}

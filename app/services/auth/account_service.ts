import User from '#models/user'
import { DateTime } from 'luxon'

type SignupPayload = {
  name: string
  email: string
  password: string
}

export default class AccountService {
  register(payload: SignupPayload) {
    return User.create(payload)
  }

  async validateLogin(email: string, password: string) {
    let user: User

    try {
      user = await User.verifyCredentials(email, password)
    } catch {
      return null
    }

    if (!user.isActive || user.deletedAt) {
      return null
    }

    user.lastLoginAt = DateTime.local()
    await user.save()

    return user
  }
}

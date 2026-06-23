import Role from '#models/role'
import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { userCreateValidator, userUpdateValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class UsersController {
  async index({ serialize }: HttpContext) {
    const users = await User.query()
      .preload('role', (roleQuery) => roleQuery.preload('permissions'))
      .orderBy('name', 'asc')

    return serialize({
      users: UserTransformer.transform(users),
    })
  }

  async roles() {
    return Role.query().where('is_active', true).orderBy('name', 'asc')
  }

  async store({ request, response, serialize }: HttpContext) {
    const payload = await request.validateUsing(userCreateValidator)
    const duplicatedUser = await User.query().where('email', payload.email).first()

    if (duplicatedUser) {
      return response.conflict({ message: 'Email already exists' })
    }

    const user = await User.create({
      ...payload,
      isActive: payload.isActive ?? true,
      roleId: payload.roleId ?? null,
    })

    await user.load('role', (roleQuery) => roleQuery.preload('permissions'))

    response.status(201)

    return serialize({
      user: UserTransformer.transform(user),
    })
  }

  async update({ params, request, response, serialize }: HttpContext) {
    const payload = await request.validateUsing(userUpdateValidator)
    const { password, ...profilePayload } = payload
    const user = await User.query().where('id', params.id).first()

    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    const duplicatedUser = await User.query()
      .where('email', payload.email)
      .whereNot('id', user.id)
      .first()

    if (duplicatedUser) {
      return response.conflict({ message: 'Email already exists' })
    }

    user.merge({
      ...profilePayload,
      roleId: profilePayload.roleId ?? null,
      isActive: profilePayload.isActive ?? true,
    })

    if (profilePayload.isActive === true) {
      user.deletedAt = null
    }

    if (profilePayload.isActive === false && !user.deletedAt) {
      user.deletedAt = DateTime.local()
    }

    if (password) {
      user.password = password
    }

    await user.save()
    await user.load('role', (roleQuery) => roleQuery.preload('permissions'))

    return serialize({
      user: UserTransformer.transform(user),
    })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = await User.query().where('id', params.id).whereNull('deleted_at').first()

    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    if (auth.user?.id === user.id) {
      return response.badRequest({ message: 'No puedes desactivar tu propio usuario' })
    }

    user.isActive = false
    user.deletedAt = DateTime.local()
    await user.save()

    return response.noContent()
  }

  async reactivate({ params, response, serialize }: HttpContext) {
    const user = await User.query().where('id', params.id).first()

    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    user.isActive = true
    user.deletedAt = null
    await user.save()
    await user.load('role', (roleQuery) => roleQuery.preload('permissions'))

    return serialize({
      user: UserTransformer.transform(user),
    })
  }
}

import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'name',
        'fullName',
        'email',
        'roleId',
        'phone',
        'jobTitle',
        'department',
        'isActive',
        'createdAt',
        'updatedAt',
        'initials',
      ]),
      role: this.resource.role
        ? {
            id: this.resource.role.id,
            name: this.resource.role.name,
            slug: this.resource.role.slug,
          }
        : null,
      permissions: this.resource.role?.permissions.map((permission) => permission.slug) ?? [],
    }
  }
}

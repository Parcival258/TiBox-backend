import type User from '#models/user'

export default class AuthorizationService {
  async loadAccessProfile(user: User) {
    await user.load('role', (roleQuery) => {
      roleQuery.preload('permissions')
    })

    return user
  }

  async getPermissionSlugs(user: User) {
    await this.loadAccessProfile(user)

    return user.role?.permissions.map((permission) => permission.slug) ?? []
  }

  async hasEveryPermission(user: User, permissions: string[]) {
    if (permissions.length === 0) {
      return true
    }

    const availablePermissions = new Set(await this.getPermissionSlugs(user))

    return permissions.every((permission) => availablePermissions.has(permission))
  }

  async hasAnyPermission(user: User, permissions: string[]) {
    if (permissions.length === 0) {
      return true
    }

    const availablePermissions = new Set(await this.getPermissionSlugs(user))

    return permissions.some((permission) => availablePermissions.has(permission))
  }
}

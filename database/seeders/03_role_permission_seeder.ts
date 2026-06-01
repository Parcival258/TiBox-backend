import Permission from '#models/permission'
import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const roles = await Role.all()
    const permissions = await Permission.all()

    const roleBySlug = new Map(roles.map((role) => [role.slug, role]))
    const permissionBySlug = new Map(permissions.map((permission) => [permission.slug, permission]))

    const permissionsByRole: Record<string, string[]> = {
      admin: permissions.map((permission) => permission.slug),

      equipment_manager: [
        'alerts.view',
        'alerts.manage',
        'equipment.view',
        'equipment.create',
        'equipment.update',
        'equipment.delete',
        'equipment.assign',
        'equipment.return',
        'equipment.attachments.manage',
        'settings.headquarters.view',
        'settings.headquarters.manage',
        'settings.locations.view',
        'settings.locations.manage',
        'maintenance.view',
        'failure_reports.view',
        'failure_reports.manage',
      ],

      maintenance_technician: [
        'alerts.view',
        'equipment.view',
        'equipment.attachments.manage',
        'maintenance.view',
        'maintenance.create',
        'maintenance.update',
        'maintenance.close',
        'failure_reports.view',
        'failure_reports.manage',
      ],

      user: ['equipment.view', 'failure_reports.view', 'failure_reports.create'],

      auditor: [
        'alerts.view',
        'users.view',
        'equipment.view',
        'settings.headquarters.view',
        'settings.locations.view',
        'maintenance.view',
        'failure_reports.view',
        'audit_logs.view',
      ],
    }

    for (const [roleSlug, permissionSlugs] of Object.entries(permissionsByRole)) {
      const role = roleBySlug.get(roleSlug)

      if (!role) continue

      const permissionIds = permissionSlugs
        .map((slug) => permissionBySlug.get(slug)?.id)
        .filter((id): id is string => Boolean(id))

      await role.related('permissions').sync(permissionIds)
    }
  }
}

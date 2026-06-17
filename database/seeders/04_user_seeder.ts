import Role from '#models/role'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const roles = await Role.query().whereIn('slug', [
      'admin',
      'equipment_manager',
      'maintenance_technician',
      'user',
      'auditor',
    ])
    const roleBySlug = new Map(roles.map((role) => [role.slug, role.id]))

    await User.updateOrCreateMany('email', [
      {
        name: 'Admin Inventario',
        email: 'admin@inventario.local',
        password: 'Admin12345',
        roleId: roleBySlug.get('admin') ?? null,
        phone: '3000000001',
        jobTitle: 'Administrador del sistema',
        department: 'TI',
        isActive: true,
      },
      {
        name: 'Laura Gestion',
        email: 'equipos@inventario.local',
        password: 'Admin12345',
        roleId: roleBySlug.get('equipment_manager') ?? null,
        phone: '3000000002',
        jobTitle: 'Gestora de equipos',
        department: 'Operaciones TI',
        isActive: true,
      },
      {
        name: 'Carlos Tecnico',
        email: 'tecnico@inventario.local',
        password: 'Admin12345',
        roleId: roleBySlug.get('maintenance_technician') ?? null,
        phone: '3000000003',
        jobTitle: 'Tecnico de soporte',
        department: 'Soporte',
        isActive: true,
      },
      {
        name: 'Ana Usuario',
        email: 'ana.usuario@inventario.local',
        password: 'Admin12345',
        roleId: roleBySlug.get('user') ?? null,
        phone: '3000000004',
        jobTitle: 'Analista administrativa',
        department: 'Administracion',
        isActive: true,
      },
      {
        name: 'Diego Auditor',
        email: 'auditor@inventario.local',
        password: 'Admin12345',
        roleId: roleBySlug.get('auditor') ?? null,
        phone: '3000000005',
        jobTitle: 'Auditor interno',
        department: 'Control interno',
        isActive: true,
      },
    ])
  }
}
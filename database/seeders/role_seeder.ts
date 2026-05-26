import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Role.updateOrCreateMany('slug', [
      {
        name: 'Administrador',
        slug: 'admin',
        description: 'acceso completo al sistema',
        isActive: true,
      },
      {
        name: 'Gestor de equipos',
        slug: 'equipment_manager',
        description:
          'Gestiona equipos, sedes, ubicaciones, responsables y asignaciones de equipos.',
        isActive: true,
      },
      {
        name: 'Técnico de mantenimiento',
        slug: 'maintenance_technician',
        description:
          'Gestiona mantenimientos programados, registro de mantenimientos y reportes de fallas ',
        isActive: true,
      },
      {
        name: 'Usuario',
        slug: 'user',
        description: 'Consulta sus equipos y reporta fallas',
        isActive: true,
      },
      {
        name: 'Auditor',
        slug: 'auditor',
        description:
          'consulta informacion del sistema y revisa registros de auditoria sin modificar datos',
        isActive: true,
      },
    ])
  }
}

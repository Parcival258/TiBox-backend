import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Role.updateOrCreateMany('slug', [
      {
        name: 'Administrador',
        slug: 'admin',
        description: 'Acceso completo al sistema.',
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
        name: 'Tecnico de mantenimiento',
        slug: 'maintenance_technician',
        description:
          'Gestiona mantenimientos programados, registros de mantenimiento y reportes de fallas.',
        isActive: true,
      },
      {
        name: 'Usuario',
        slug: 'user',
        description: 'Consulta sus equipos y reporta fallas.',
        isActive: true,
      },
      {
        name: 'Auditor',
        slug: 'auditor',
        description:
          'Consulta informacion del sistema y revisa registros de auditoria sin modificar datos.',
        isActive: true,
      },
    ])
  }
}

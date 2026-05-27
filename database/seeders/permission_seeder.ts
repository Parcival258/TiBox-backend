import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { PermissionSchema } from '#database/schema'

export default class extends BaseSeeder {
  async run() {
    await PermissionSchema.updateOrCreateMany('slug', [
      {
        name: 'Ver usuario',
        slug: 'users.view',
        description: 'permite consultar usuarios del sistema.',
      },
      {
        name: 'Crear usuarios',
        slug: 'users.crete',
        description: 'permite crear usuarios.',
      },
      {
        name: 'Editar usuarios',
        slug: 'users.update',
        description: 'Permite editar usuarios ya existentes.',
      },
      {
        name: 'Eliminar usuarios',
        slug: 'users.delete',
        description: 'Permite eliminar usuarios.',
      },
      {
        name: 'Ver equipos',
        slug: 'equipment.view',
        description: 'permite consultar equpos.',
      },
      {
        name: 'Crear equipos',
        slug: 'equipment.create',
        description: 'Permite registrar nuevos equipos.',
      },
      {
        name: 'Editar equipos',
        slug: 'equipment.update',
        description: 'Permite actualizar información de los equipos existentes.',
      },
      {
        name: 'Eliminar Equipos',
        slug: 'equipment.delete',
        description: 'Permite eliminar equipos.',
      },
      {
        name: 'Asiganar equipos',
        slug: 'equipment.assign',
        description: 'Permite asignar equipos a usuarios.',
      },
      {
        name: 'Retornar equipos',
        slug: 'equipment.return',
        description: 'Permite registrar devoluciones de equipos.',
      },
      {
        name: 'Ver mantenimientos',
        slug: 'maintenance.view',
        description: 'permite consultar los mantenimientos.',
      },
      {
        name: 'Crear mantenimientos',
        slug: 'maintenance.create',
        description: 'Permite crear o registrar mantenimientos.',
      },
      {
        name: 'Editar mantenimientos',
        slug: 'maintenance.update',
        description: 'Permite actualizar mantenimentos.',
      },
      {
        name: 'Cerrar mantenimientos',
        slug: 'maintenance.close',
        description: 'Permite finalizar mantenimientos.',
      },
      {
        name: 'Ver reportes de fallas',
        slug: 'failure_reports.view',
        description: 'Permite consultar reportes de fallas',
      },
      {
        name: 'Crear reportes de fallas',
        slug: 'failure_reports.create',
        description: 'Permite crear reportes de fallas',
      },
      {
        name: 'Gestionar reportes de fallas',
        slug: 'failure_reports.manage',
        description: 'Permite gestionar y cerrar reportes',
      },
      {
        name: 'Ver auditoría',
        slug: 'audit_logs.view',
        description: 'Permite consultar registros de auditoría.',
      },
    ])
  }
}

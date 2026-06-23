import Permission from '#models/permission'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Permission.updateOrCreateMany('slug', [
      {
        name: 'Ver usuarios',
        slug: 'users.view',
        description: 'Permite consultar usuarios del sistema.',
      },
      {
        name: 'Crear usuarios',
        slug: 'users.create',
        description: 'Permite crear usuarios.',
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
        description: 'Permite consultar equipos.',
      },
      {
        name: 'Crear equipos',
        slug: 'equipment.create',
        description: 'Permite registrar nuevos equipos.',
      },
      {
        name: 'Editar equipos',
        slug: 'equipment.update',
        description: 'Permite actualizar informacion de los equipos existentes.',
      },
      {
        name: 'Eliminar equipos',
        slug: 'equipment.delete',
        description: 'Permite eliminar equipos.',
      },
      {
        name: 'Asignar equipos',
        slug: 'equipment.assign',
        description: 'Permite asignar equipos a usuarios.',
      },
      {
        name: 'Retornar equipos',
        slug: 'equipment.return',
        description: 'Permite registrar devoluciones de equipos.',
      },
      {
        name: 'Gestionar adjuntos de equipos',
        slug: 'equipment.attachments.manage',
        description: 'Permite cargar, consultar y eliminar adjuntos de equipos.',
      },
      {
        name: 'Ver sedes',
        slug: 'settings.headquarters.view',
        description: 'Permite consultar sedes.',
      },
      {
        name: 'Gestionar sedes',
        slug: 'settings.headquarters.manage',
        description: 'Permite crear y actualizar sedes.',
      },
      {
        name: 'Ver ubicaciones',
        slug: 'settings.locations.view',
        description: 'Permite consultar ubicaciones.',
      },
      {
        name: 'Gestionar ubicaciones',
        slug: 'settings.locations.manage',
        description: 'Permite crear y actualizar ubicaciones.',
      },
      {
        name: 'Ver mantenimientos',
        slug: 'maintenance.view',
        description: 'Permite consultar los mantenimientos.',
      },
      {
        name: 'Crear mantenimientos',
        slug: 'maintenance.create',
        description: 'Permite crear o registrar mantenimientos.',
      },
      {
        name: 'Editar mantenimientos',
        slug: 'maintenance.update',
        description: 'Permite actualizar mantenimientos.',
      },
      {
        name: 'Cerrar mantenimientos',
        slug: 'maintenance.close',
        description: 'Permite finalizar mantenimientos.',
      },
      {
        name: 'Ver reportes de fallas',
        slug: 'failure_reports.view',
        description: 'Permite consultar reportes de fallas.',
      },
      {
        name: 'Crear reportes de fallas',
        slug: 'failure_reports.create',
        description: 'Permite crear reportes de fallas.',
      },
      {
        name: 'Gestionar reportes de fallas',
        slug: 'failure_reports.manage',
        description: 'Permite gestionar y cerrar reportes.',
      },
      {
        name: 'Ver auditoria',
        slug: 'audit_logs.view',
        description: 'Permite consultar registros de auditoria.',
      },
      {
        name: 'Ver alertas',
        slug: 'alerts.view',
        description: 'Permite consultar alertas y notificaciones internas.',
      },
      {
        name: 'Gestionar alertas',
        slug: 'alerts.manage',
        description: 'Permite ejecutar seguimiento automatico y resolver alertas.',
      },
      {
        name: 'Gestionar logs del sistema',
        slug: 'system_logs.manage',
        description: 'Permite consultar y limpiar errores tecnicos del sistema.',
      },
    ])
  }
}

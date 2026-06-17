import EquipmentType from '#models/equipment_type'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await EquipmentType.updateOrCreateMany('name', [
      {
        name: 'Portátil',
        description: 'Equipo portátil para trabajo móvil.',
        isActive: true,
      },
      {
        name: 'Proyector',
        description: 'Equipo para proyección de contenido audiovisual.',
        isActive: true,
      },
      {
        name: 'Monitor',
        description: 'Pantalla externa para estaciones de trabajo.',
        isActive: true,
      },
      {
        name: 'Impresora',
        description: 'Equipo de impresión para documentos administrativos.',
        isActive: true,
      },
      {
        name: 'Escáner',
        description: 'Equipo de digitalización de documentos.',
        isActive: true,
      },
      {
        name: 'Tablet',
        description: 'Dispositivo móvil para consulta y registro en campo.',
        isActive: true,
      },
      {
        name: 'Teléfono',
        description: 'Equipo telefónico institucional.',
        isActive: true,
      },
      {
        name: 'Router',
        description: 'Equipo de red para conectividad.',
        isActive: true,
      },
      {
        name: 'Switch',
        description: 'Equipo de red para interconexión local.',
        isActive: true,
      },
    ])
  }
}

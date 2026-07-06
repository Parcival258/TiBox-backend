import EquipmentType from '#models/equipment_type'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await EquipmentType.updateOrCreateMany('name', [
      {
        name: 'Portatil',
        description: 'Equipo portatil para trabajo movil.',
        isActive: true,
      },
      {
        name: 'Proyector',
        description: 'Equipo para proyeccion de contenido audiovisual.',
        isActive: true,
      },
      {
        name: 'Monitor',
        description: 'Pantalla externa para estaciones de trabajo.',
        isActive: true,
      },
      {
        name: 'Impresora',
        description: 'Equipo de impresion para documentos administrativos.',
        isActive: true,
      },
      {
        name: 'Escaner',
        description: 'Equipo de digitalizacion de documentos.',
        isActive: true,
      },
      {
        name: 'Tablet',
        description: 'Dispositivo movil para consulta y registro en campo.',
        isActive: true,
      },
      {
        name: 'Telefono',
        description: 'Equipo telefonico institucional.',
        isActive: true,
      },
      {
        name: 'Router',
        description: 'Equipo de red para conectividad.',
        isActive: true,
      },
      {
        name: 'Switch',
        description: 'Equipo de red para interconexion local.',
        isActive: true,
      },
    ])
  }
}

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
        name:'Monitor',
        description:'Equipo para visualizar contenido',
        isActive:true
      }
    ])
  }
}

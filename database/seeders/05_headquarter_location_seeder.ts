import Headquarter from '#models/headquarter'
import Location from '#models/location'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const main = await Headquarter.updateOrCreate(
      { name: 'Sede Principal' },
      {
        name: 'Sede Principal',
        city: 'Bogota',
        address: 'Calle 100 # 15-20',
        description: 'Oficina principal administrativa y tecnologica.',
        isActive: true,
      }
    )

    const warehouse = await Headquarter.updateOrCreate(
      { name: 'Bodega TI' },
      {
        name: 'Bodega TI',
        city: 'Bogota',
        address: 'Carrera 68 # 26-40',
        description: 'Bodega de equipos disponibles, repuestos y garantias.',
        isActive: true,
      }
    )

    const branch = await Headquarter.updateOrCreate(
      { name: 'Sede Norte' },
      {
        name: 'Sede Norte',
        city: 'Chia',
        address: 'Avenida Pradilla # 5-80',
        description: 'Sede operativa regional.',
        isActive: true,
      }
    )

    await Location.updateOrCreateMany(
      ['headquarterId', 'area', 'office'],
      [
        {
          headquarterId: main.id,
          floor: '1',
          area: 'Recepcion',
          office: '101',
          description: 'Punto de recepcion y atencion inicial.',
          isActive: true,
        },
        {
          headquarterId: main.id,
          floor: '2',
          area: 'Administracion',
          office: '204',
          description: 'Equipo administrativo.',
          isActive: true,
        },
        {
          headquarterId: main.id,
          floor: '3',
          area: 'Tecnologia',
          office: '301',
          description: 'Mesa de ayuda y soporte interno.',
          isActive: true,
        },
        {
          headquarterId: warehouse.id,
          floor: '1',
          area: 'Almacen',
          office: 'A1',
          description: 'Equipos disponibles para entrega.',
          isActive: true,
        },
        {
          headquarterId: warehouse.id,
          floor: '1',
          area: 'Laboratorio',
          office: 'LAB',
          description: 'Diagnostico, alistamiento y mantenimiento.',
          isActive: true,
        },
        {
          headquarterId: branch.id,
          floor: '1',
          area: 'Operacion',
          office: 'N101',
          description: 'Zona de usuarios de la sede norte.',
          isActive: true,
        },
      ]
    )
  }
}

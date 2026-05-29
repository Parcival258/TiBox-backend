import Equipment from '#models/equipment'
import Headquarter from '#models/headquarter'
import Location from '#models/location'
import User from '#models/user'
import { equipmentStatuses, ownershipTypes } from '#validators/equipment'

export default class EquipmentCatalogService {
  async getCatalogs() {
    const [types, brands, headquarters, locations, responsibles] = await Promise.all([
      this.distinctEquipmentValues('type'),
      this.distinctEquipmentValues('brand'),
      Headquarter.query()
        .where('is_active', true)
        .orderBy('name', 'asc')
        .select(['id', 'name', 'city']),
      Location.query()
        .where('is_active', true)
        .preload('headquarter')
        .orderBy('area', 'asc')
        .select(['id', 'headquarter_id', 'floor', 'area', 'office']),
      User.query()
        .where('is_active', true)
        .whereNull('deleted_at')
        .orderBy('name', 'asc')
        .select(['id', 'name', 'email', 'job_title', 'department']),
    ])

    return {
      statuses: equipmentStatuses,
      ownershipTypes,
      types,
      brands,
      headquarters,
      locations,
      responsibles,
    }
  }

  private async distinctEquipmentValues(column: 'type' | 'brand') {
    const rows = await Equipment.query()
      .whereNull('deleted_at')
      .whereNotNull(column)
      .distinct(column)
      .orderBy(column, 'asc')

    return rows.map((row) => row[column]).filter((value): value is string => Boolean(value))
  }
}

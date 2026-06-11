import Equipment from '#models/equipment'
import EquipmentType from '#models/equipment_type'
import Headquarter from '#models/headquarter'
import Location from '#models/location'
import User from '#models/user'
import { equipmentStatuses, ownershipTypes } from '#validators/equipment'
import db from '@adonisjs/lucid/services/db'

export default class EquipmentCatalogService {
  async getCatalogs() {
    const [types, brands, headquarters, locations, responsibles, technicians] = await Promise.all([
      this.getEquipmentTypes(),
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
      User.query()
        .where('is_active', true)
        .whereNull('deleted_at')
        .whereHas('role', (roleQuery) => {
          roleQuery.where('slug', 'maintenance_technician')
        })
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
      technicians,
    }
  }

  private async getEquipmentTypes() {
    const hasEquipmentTypesTable = await db.connection().schema.hasTable('equipment_types')

    if (!hasEquipmentTypesTable) {
      return this.distinctEquipmentValues('type')
    }

    const types = await EquipmentType.query()
      .where('is_active', true)
      .orderBy('name', 'asc')
      .select('name')

    return types.map((type) => type.name)
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

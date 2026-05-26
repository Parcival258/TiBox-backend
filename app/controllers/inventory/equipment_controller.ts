import Equipment from '#models/equipment'
import { equipmentValidator } from '#validators/equipment'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class EquipmentController {
  async index({ request }: HttpContext) {
    const search = request.input('search')
    const status = request.input('status')

    const query = Equipment.query()
      .whereNull('deleted_at')
      .preload('headquarter')
      .preload('location')
      .preload('currentResponsible')
      .orderBy('created_at', 'desc')
      .limit(50)

    if (status) {
      query.where('status', status)
    }

    if (search) {
      query.where((builder) => {
        builder
          .whereILike('internal_code', `%${search}%`)
          .orWhereILike('serial', `%${search}%`)
          .orWhereILike('asset_tag', `%${search}%`)
          .orWhereILike('brand', `%${search}%`)
          .orWhereILike('model', `%${search}%`)
      })
    }

    return query
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(equipmentValidator)
    const equipment = await Equipment.create(payload)

    return response.created(equipment)
  }

  async show({ params, response }: HttpContext) {
    const equipment = await Equipment.query()
      .where('id', params.id)
      .whereNull('deleted_at')
      .preload('headquarter')
      .preload('location')
      .preload('currentResponsible')
      .preload('assignments')
      .preload('maintenanceSchedules')
      .preload('maintenanceRecords')
      .first()

    if (!equipment) {
      return response.notFound({ message: 'Equipment not found' })
    }

    return equipment
  }

  async update({ params, request, response }: HttpContext) {
    const equipment = await Equipment.query().where('id', params.id).whereNull('deleted_at').first()
    if (!equipment) {
      return response.notFound({ message: 'Equipment not found' })
    }

    const payload = await request.validateUsing(equipmentValidator)
    equipment.merge(payload)
    await equipment.save()

    return equipment
  }

  async destroy({ params, response }: HttpContext) {
    const equipment = await Equipment.query().where('id', params.id).whereNull('deleted_at').first()
    if (!equipment) {
      return response.notFound({ message: 'Equipment not found' })
    }

    equipment.deletedAt = DateTime.local()
    await equipment.save()

    return response.noContent()
  }
}

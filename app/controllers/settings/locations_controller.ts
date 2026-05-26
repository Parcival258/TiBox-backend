import Location from '#models/location'
import { locationValidator } from '#validators/location'
import type { HttpContext } from '@adonisjs/core/http'

export default class LocationsController {
  async index() {
    return Location.query().preload('headquarter').orderBy('area', 'asc')
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(locationValidator)
    const location = await Location.create(payload)

    return response.created(location)
  }

  async show({ params, response }: HttpContext) {
    const location = await Location.query().where('id', params.id).preload('headquarter').first()
    if (!location) {
      return response.notFound({ message: 'Location not found' })
    }

    return location
  }

  async update({ params, request, response }: HttpContext) {
    const location = await Location.find(params.id)
    if (!location) {
      return response.notFound({ message: 'Location not found' })
    }

    const payload = await request.validateUsing(locationValidator)
    location.merge(payload)
    await location.save()

    return location
  }
}

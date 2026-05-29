import LocationService from '#services/settings/location_service'
import { locationValidator } from '#validators/location'
import type { HttpContext } from '@adonisjs/core/http'

export default class LocationsController {
  private locationService = new LocationService()

  async index() {
    return this.locationService.list()
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(locationValidator)
    const location = await this.locationService.create(payload)

    return response.created(location)
  }

  async show({ params, response }: HttpContext) {
    const location = await this.locationService.findDetails(params.id)

    if (!location) {
      return response.notFound({ message: 'Location not found' })
    }

    return location
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(locationValidator)
    const location = await this.locationService.update(params.id, payload)

    if (!location) {
      return response.notFound({ message: 'Location not found' })
    }

    return location
  }

  async destroy({ params, response }: HttpContext) {
    const location = await this.locationService.deactivate(params.id)

    if (!location) {
      return response.notFound({ message: 'Location not found' })
    }

    return response.noContent()
  }
}

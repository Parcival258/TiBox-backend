import HeadquarterService from '#services/settings/headquarter_service'
import { headquarterValidator } from '#validators/headquarter'
import type { HttpContext } from '@adonisjs/core/http'

export default class HeadquartersController {
  private headquarterService = new HeadquarterService()

  async index() {
    return this.headquarterService.list()
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(headquarterValidator)
    const headquarter = await this.headquarterService.create(payload)

    return response.created(headquarter)
  }

  async show({ params, response }: HttpContext) {
    const headquarter = await this.headquarterService.find(params.id)

    if (!headquarter) {
      return response.notFound({ message: 'Headquarter not found' })
    }

    return headquarter
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(headquarterValidator)
    const headquarter = await this.headquarterService.update(params.id, payload)

    if (!headquarter) {
      return response.notFound({ message: 'Headquarter not found' })
    }

    return headquarter
  }

  async destroy({ params, response }: HttpContext) {
    const headquarter = await this.headquarterService.deactivate(params.id)

    if (!headquarter) {
      return response.notFound({ message: 'Headquarter not found' })
    }

    return response.noContent()
  }
}

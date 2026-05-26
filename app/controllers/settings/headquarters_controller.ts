import Headquarter from '#models/headquarter'
import { headquarterValidator } from '#validators/headquarter'
import type { HttpContext } from '@adonisjs/core/http'

export default class HeadquartersController {
  async index() {
    return Headquarter.query().orderBy('name', 'asc')
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(headquarterValidator)
    const headquarter = await Headquarter.create(payload)

    return response.created(headquarter)
  }

  async show({ params, response }: HttpContext) {
    const headquarter = await Headquarter.find(params.id)
    if (!headquarter) {
      return response.notFound({ message: 'Headquarter not found' })
    }

    return headquarter
  }

  async update({ params, request, response }: HttpContext) {
    const headquarter = await Headquarter.find(params.id)
    if (!headquarter) {
      return response.notFound({ message: 'Headquarter not found' })
    }

    const payload = await request.validateUsing(headquarterValidator)
    headquarter.merge(payload)
    await headquarter.save()

    return headquarter
  }
}

import Headquarter from '#models/headquarter'

type HeadquarterPayload = Partial<Headquarter>

export default class HeadquarterService {
  list() {
    return Headquarter.query().orderBy('name', 'asc')
  }

  create(payload: HeadquarterPayload) {
    return Headquarter.create(payload)
  }

  find(id: string) {
    return Headquarter.find(id)
  }

  async update(id: string, payload: HeadquarterPayload) {
    const headquarter = await this.find(id)

    if (!headquarter) {
      return null
    }

    headquarter.merge(payload)
    await headquarter.save()

    return headquarter
  }

  async deactivate(id: string) {
    const headquarter = await this.find(id)

    if (!headquarter) {
      return null
    }

    headquarter.isActive = false
    await headquarter.save()

    return headquarter
  }
}

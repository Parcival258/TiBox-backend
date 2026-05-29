import Location from '#models/location'

type LocationPayload = Partial<Location>

export default class LocationService {
  list() {
    return Location.query().preload('headquarter').orderBy('area', 'asc')
  }

  create(payload: LocationPayload) {
    return Location.create(payload)
  }

  findDetails(id: string) {
    return Location.query().where('id', id).preload('headquarter').first()
  }

  find(id: string) {
    return Location.find(id)
  }

  async update(id: string, payload: LocationPayload) {
    const location = await this.find(id)

    if (!location) {
      return null
    }

    location.merge(payload)
    await location.save()

    return location
  }

  async deactivate(id: string) {
    const location = await this.find(id)

    if (!location) {
      return null
    }

    location.isActive = false
    await location.save()

    return location
  }
}

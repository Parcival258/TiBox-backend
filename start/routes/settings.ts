import router from '@adonisjs/core/services/router'

const HeadquartersController = () => import('#controllers/settings/headquarters_controller')
const LocationsController = () => import('#controllers/settings/locations_controller')

export default function settingsRoutes() {
  router
    .group(() => {
      router.resource('headquarters', HeadquartersController).apiOnly()
      router.resource('locations', LocationsController).apiOnly()
    })
    .as('settings')
}

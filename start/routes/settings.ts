import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const HeadquartersController = () => import('#controllers/settings/headquarters_controller')
const LocationsController = () => import('#controllers/settings/locations_controller')

export default function settingsRoutes() {
  router
    .group(() => {
      router
        .get('headquarters', [HeadquartersController, 'index'])
        .use(middleware.permission({ permissions: ['settings.headquarters.view'] }))
        .as('headquarters.index')
      router
        .post('headquarters', [HeadquartersController, 'store'])
        .use(middleware.permission({ permissions: ['settings.headquarters.manage'] }))
        .as('headquarters.store')
      router
        .get('headquarters/:id', [HeadquartersController, 'show'])
        .use(middleware.permission({ permissions: ['settings.headquarters.view'] }))
        .as('headquarters.show')
      router
        .put('headquarters/:id', [HeadquartersController, 'update'])
        .use(middleware.permission({ permissions: ['settings.headquarters.manage'] }))
        .as('headquarters.update')
      router
        .patch('headquarters/:id', [HeadquartersController, 'update'])
        .use(middleware.permission({ permissions: ['settings.headquarters.manage'] }))
        .as('headquarters.patch')
      router
        .delete('headquarters/:id', [HeadquartersController, 'destroy'])
        .use(middleware.permission({ permissions: ['settings.headquarters.manage'] }))
        .as('headquarters.destroy')

      router
        .get('locations', [LocationsController, 'index'])
        .use(middleware.permission({ permissions: ['settings.locations.view'] }))
        .as('locations.index')
      router
        .post('locations', [LocationsController, 'store'])
        .use(middleware.permission({ permissions: ['settings.locations.manage'] }))
        .as('locations.store')
      router
        .get('locations/:id', [LocationsController, 'show'])
        .use(middleware.permission({ permissions: ['settings.locations.view'] }))
        .as('locations.show')
      router
        .put('locations/:id', [LocationsController, 'update'])
        .use(middleware.permission({ permissions: ['settings.locations.manage'] }))
        .as('locations.update')
      router
        .patch('locations/:id', [LocationsController, 'update'])
        .use(middleware.permission({ permissions: ['settings.locations.manage'] }))
        .as('locations.patch')
      router
        .delete('locations/:id', [LocationsController, 'destroy'])
        .use(middleware.permission({ permissions: ['settings.locations.manage'] }))
        .as('locations.destroy')
    })
    .use(middleware.auth())
    .as('settings')
}

import router from '@adonisjs/core/services/router'

const EquipmentController = () => import('#controllers/inventory/equipment_controller')

export default function inventoryRoutes() {
  router
    .group(() => {
      router.resource('equipment', EquipmentController).apiOnly()
    })
    .as('inventory')
}

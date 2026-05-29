import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const EquipmentController = () => import('#controllers/inventory/equipment_controller')
const EquipmentAssignmentsController = () =>
  import('#controllers/inventory/equipment_assignments_controller')
const EquipmentAttachmentsController = () =>
  import('#controllers/inventory/equipment_attachments_controller')
const EquipmentCatalogsController = () =>
  import('#controllers/inventory/equipment_catalogs_controller')

export default function inventoryRoutes() {
  router
    .group(() => {
      router
        .get('equipment/catalogs', [EquipmentCatalogsController, 'index'])
        .use(middleware.permission({ permissions: ['equipment.view'] }))
        .as('equipment.catalogs')
      router
        .get('equipment', [EquipmentController, 'index'])
        .use(middleware.permission({ permissions: ['equipment.view'] }))
        .as('equipment.index')
      router
        .post('equipment', [EquipmentController, 'store'])
        .use(middleware.permission({ permissions: ['equipment.create'] }))
        .as('equipment.store')
      router
        .get('equipment/:id/life-sheet', [EquipmentController, 'lifeSheet'])
        .use(middleware.permission({ permissions: ['equipment.view'] }))
        .as('equipment.life_sheet')
      router
        .get('equipment/:id', [EquipmentController, 'show'])
        .use(middleware.permission({ permissions: ['equipment.view'] }))
        .as('equipment.show')
      router
        .put('equipment/:id', [EquipmentController, 'update'])
        .use(middleware.permission({ permissions: ['equipment.update'] }))
        .as('equipment.update')
      router
        .patch('equipment/:id', [EquipmentController, 'update'])
        .use(middleware.permission({ permissions: ['equipment.update'] }))
        .as('equipment.patch')
      router
        .delete('equipment/:id', [EquipmentController, 'destroy'])
        .use(middleware.permission({ permissions: ['equipment.delete'] }))
        .as('equipment.destroy')
      router
        .get('equipment/:equipment_id/assignments', [EquipmentAssignmentsController, 'index'])
        .use(middleware.permission({ permissions: ['equipment.view'] }))
        .as('equipment.assignments.index')
      router
        .post('equipment/:equipment_id/assignments', [EquipmentAssignmentsController, 'store'])
        .use(middleware.permission({ permissions: ['equipment.assign'] }))
        .as('equipment.assignments.store')
      router
        .patch('equipment/:equipment_id/assignments/current/return', [
          EquipmentAssignmentsController,
          'returnCurrent',
        ])
        .use(middleware.permission({ permissions: ['equipment.return'] }))
        .as('equipment.assignments.return_current')
      router
        .get('equipment/:equipment_id/attachments', [EquipmentAttachmentsController, 'index'])
        .use(middleware.permission({ permissions: ['equipment.attachments.manage'] }))
        .as('equipment.attachments.index')
      router
        .post('equipment/:equipment_id/attachments', [EquipmentAttachmentsController, 'store'])
        .use(middleware.permission({ permissions: ['equipment.attachments.manage'] }))
        .as('equipment.attachments.store')
      router
        .get('equipment/:equipment_id/attachments/:id', [EquipmentAttachmentsController, 'show'])
        .use(middleware.permission({ permissions: ['equipment.attachments.manage'] }))
        .as('equipment.attachments.show')
      router
        .delete('equipment/:equipment_id/attachments/:id', [
          EquipmentAttachmentsController,
          'destroy',
        ])
        .use(middleware.permission({ permissions: ['equipment.attachments.manage'] }))
        .as('equipment.attachments.destroy')
    })
    .use(middleware.auth())
    .as('inventory')
}

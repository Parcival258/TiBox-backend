import router from '@adonisjs/core/services/router'

const EquipmentController = () => import('#controllers/inventory/equipment_controller')
const EquipmentAssignmentsController = () =>
  import('#controllers/inventory/equipment_assignments_controller')
const EquipmentAttachmentsController = () =>
  import('#controllers/inventory/equipment_attachments_controller')

export default function inventoryRoutes() {
  router
    .group(() => {
      router.resource('equipment', EquipmentController).apiOnly()
      router
        .get('equipment/:equipment_id/assignments', [EquipmentAssignmentsController, 'index'])
        .as('equipment.assignments.index')
      router
        .post('equipment/:equipment_id/assignments', [EquipmentAssignmentsController, 'store'])
        .as('equipment.assignments.store')
      router
        .patch('equipment/:equipment_id/assignments/current/return', [
          EquipmentAssignmentsController,
          'returnCurrent',
        ])
        .as('equipment.assignments.return_current')
      router
        .get('equipment/:equipment_id/attachments', [EquipmentAttachmentsController, 'index'])
        .as('equipment.attachments.index')
      router
        .post('equipment/:equipment_id/attachments', [EquipmentAttachmentsController, 'store'])
        .as('equipment.attachments.store')
      router
        .get('equipment/:equipment_id/attachments/:id', [EquipmentAttachmentsController, 'show'])
        .as('equipment.attachments.show')
      router
        .delete('equipment/:equipment_id/attachments/:id', [
          EquipmentAttachmentsController,
          'destroy',
        ])
        .as('equipment.attachments.destroy')
    })
    .as('inventory')
}

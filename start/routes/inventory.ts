import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const EquipmentController = () => import('#controllers/inventory/equipment_controller')
const EquipmentAssignmentsController = () =>
  import('#controllers/inventory/equipment_assignments_controller')
const EquipmentAttachmentsController = () =>
  import('#controllers/inventory/equipment_attachments_controller')
const EquipmentCatalogsController = () =>
  import('#controllers/inventory/equipment_catalogs_controller')
const EquipmentTypesController = () => import('#controllers/inventory/equipment_types_controller')
const EquipmentGroupsController = () => import('#controllers/inventory/equipment_groups_controller')
const EquipmentLoansController = () => import('#controllers/inventory/equipment_loans_controller')
const FailureReportsController = () => import('#controllers/inventory/failure_reports_controller')
const MaintenanceRecordsController = () =>
  import('#controllers/inventory/maintenance_records_controller')
const MaintenanceRecordAttachmentsController = () =>
  import('#controllers/inventory/maintenance_record_attachments_controller')
const MaintenanceSchedulesController = () =>
  import('#controllers/inventory/maintenance_schedules_controller')

export default function inventoryRoutes() {
  router
    .group(() => {
      router
        .get('equipment/catalogs', [EquipmentCatalogsController, 'index'])
        .use(middleware.permission({ permissions: ['equipment.view'] }))
        .as('equipment.catalogs')
      router
        .get('equipment-types', [EquipmentTypesController, 'index'])
        .use(middleware.permission({ permissions: ['equipment.view'] }))
        .as('equipment_types.index')
      router
        .post('equipment-types', [EquipmentTypesController, 'store'])
        .use(middleware.permission({ permissions: ['equipment.create'] }))
        .as('equipment_types.store')
      router
        .patch('equipment-types/:id', [EquipmentTypesController, 'update'])
        .use(middleware.permission({ permissions: ['equipment.update'] }))
        .as('equipment_types.update')
      router
        .delete('equipment-types/:id', [EquipmentTypesController, 'destroy'])
        .use(middleware.permission({ permissions: ['equipment.update'] }))
        .as('equipment_types.destroy')
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
        .patch('equipment/:id/restore', [EquipmentController, 'restore'])
        .use(middleware.permission({ permissions: ['equipment.update'] }))
        .as('equipment.restore')
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
        .get('equipment-groups', [EquipmentGroupsController, 'index'])
        .use(middleware.permission({ permissions: ['equipment.view'] }))
        .as('equipment_groups.index')
      router
        .post('equipment-groups', [EquipmentGroupsController, 'store'])
        .use(middleware.permission({ permissions: ['equipment.update'] }))
        .as('equipment_groups.store')
      router
        .get('equipment-groups/:id', [EquipmentGroupsController, 'show'])
        .use(middleware.permission({ permissions: ['equipment.view'] }))
        .as('equipment_groups.show')
      router
        .patch('equipment-groups/:id', [EquipmentGroupsController, 'update'])
        .use(middleware.permission({ permissions: ['equipment.update'] }))
        .as('equipment_groups.update')
      router
        .delete('equipment-groups/:id', [EquipmentGroupsController, 'destroy'])
        .use(middleware.permission({ permissions: ['equipment.update'] }))
        .as('equipment_groups.destroy')
      router
        .post('equipment-groups/:id/equipment', [EquipmentGroupsController, 'attachEquipment'])
        .use(middleware.permission({ permissions: ['equipment.update'] }))
        .as('equipment_groups.equipment.attach')
      router
        .delete('equipment-groups/:id/equipment/:equipment_id', [
          EquipmentGroupsController,
          'detachEquipment',
        ])
        .use(middleware.permission({ permissions: ['equipment.update'] }))
        .as('equipment_groups.equipment.detach')
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

      router
        .get('equipment-loans', [EquipmentLoansController, 'index'])
        .use(middleware.permission({ permissions: ['equipment.view'] }))
        .as('equipment_loans.index')
      router
        .get('equipment-loans/requestable-equipment', [
          EquipmentLoansController,
          'requestableEquipment',
        ])
        .use(middleware.permission({ permissions: ['equipment.view'] }))
        .as('equipment_loans.requestable_equipment')
      router
        .post('equipment-loans/requests', [EquipmentLoansController, 'requestLoan'])
        .use(middleware.permission({ permissions: ['equipment.view'] }))
        .as('equipment_loans.requests.store')
      router
        .post('equipment-loans', [EquipmentLoansController, 'store'])
        .use(middleware.permission({ permissions: ['equipment.assign'] }))
        .as('equipment_loans.store')
      router
        .patch('equipment-loans/:id/approve', [EquipmentLoansController, 'approve'])
        .use(middleware.permission({ permissions: ['equipment.assign'] }))
        .as('equipment_loans.approve')
      router
        .patch('equipment-loans/:id/reject', [EquipmentLoansController, 'reject'])
        .use(middleware.permission({ permissions: ['equipment.assign'] }))
        .as('equipment_loans.reject')
      router
        .patch('equipment-loans/:id/return', [EquipmentLoansController, 'returnLoan'])
        .use(middleware.permission({ permissions: ['equipment.return'] }))
        .as('equipment_loans.return')

      router
        .get('maintenance/schedules/catalogs', [MaintenanceSchedulesController, 'catalogs'])
        .use(middleware.permission({ permissions: ['maintenance.view'] }))
        .as('maintenance.schedules.catalogs')
      router
        .get('maintenance/schedules', [MaintenanceSchedulesController, 'index'])
        .use(middleware.permission({ permissions: ['maintenance.view'] }))
        .as('maintenance.schedules.index')
      router
        .post('maintenance/schedules', [MaintenanceSchedulesController, 'store'])
        .use(middleware.permission({ permissions: ['maintenance.create'] }))
        .as('maintenance.schedules.store')
      router
        .get('maintenance/schedules/:id', [MaintenanceSchedulesController, 'show'])
        .use(middleware.permission({ permissions: ['maintenance.view'] }))
        .as('maintenance.schedules.show')
      router
        .put('maintenance/schedules/:id', [MaintenanceSchedulesController, 'update'])
        .use(middleware.permission({ permissions: ['maintenance.update'] }))
        .as('maintenance.schedules.update')
      router
        .patch('maintenance/schedules/:id', [MaintenanceSchedulesController, 'update'])
        .use(middleware.permission({ permissions: ['maintenance.update'] }))
        .as('maintenance.schedules.patch')
      router
        .patch('maintenance/schedules/:id/cancel', [MaintenanceSchedulesController, 'cancel'])
        .use(middleware.permission({ permissions: ['maintenance.update'] }))
        .as('maintenance.schedules.cancel')
      router
        .patch('maintenance/schedules/:id/pending', [MaintenanceSchedulesController, 'markPending'])
        .use(middleware.permission({ permissions: ['maintenance.update'] }))
        .as('maintenance.schedules.pending')
      router
        .patch('maintenance/schedules/:id/start', [MaintenanceSchedulesController, 'start'])
        .use(middleware.permission({ permissions: ['maintenance.update'] }))
        .as('maintenance.schedules.start')
      router
        .patch('maintenance/schedules/:id/finish', [MaintenanceSchedulesController, 'finish'])
        .use(middleware.permission({ permissions: ['maintenance.close'] }))
        .as('maintenance.schedules.finish')
      router
        .patch('maintenance/schedules/:id/reschedule', [
          MaintenanceSchedulesController,
          'reschedule',
        ])
        .use(middleware.permission({ permissions: ['maintenance.update'] }))
        .as('maintenance.schedules.reschedule')

      router
        .get('maintenance/records', [MaintenanceRecordsController, 'index'])
        .use(middleware.permission({ permissions: ['maintenance.view'] }))
        .as('maintenance.records.index')
      router
        .post('maintenance/records', [MaintenanceRecordsController, 'store'])
        .use(middleware.permission({ permissions: ['maintenance.create'] }))
        .as('maintenance.records.store')
      router
        .get('maintenance/records/:id', [MaintenanceRecordsController, 'show'])
        .use(middleware.permission({ permissions: ['maintenance.view'] }))
        .as('maintenance.records.show')
      router
        .put('maintenance/records/:id', [MaintenanceRecordsController, 'update'])
        .use(middleware.permission({ permissions: ['maintenance.update'] }))
        .as('maintenance.records.update')
      router
        .patch('maintenance/records/:id', [MaintenanceRecordsController, 'update'])
        .use(middleware.permission({ permissions: ['maintenance.update'] }))
        .as('maintenance.records.patch')
      router
        .patch('maintenance/records/:id/close', [MaintenanceRecordsController, 'close'])
        .use(middleware.permission({ permissions: ['maintenance.close'] }))
        .as('maintenance.records.close')
      router
        .patch('maintenance/records/:id/reception', [
          MaintenanceRecordsController,
          'updateReception',
        ])
        .use(middleware.permission({ permissions: ['maintenance.update'] }))
        .as('maintenance.records.reception')
      router
        .patch('maintenance/records/:id/execution', [
          MaintenanceRecordsController,
          'updateExecution',
        ])
        .use(middleware.permission({ permissions: ['maintenance.update'] }))
        .as('maintenance.records.execution')
      router
        .patch('maintenance/records/:id/closure', [MaintenanceRecordsController, 'updateClosure'])
        .use(middleware.permission({ permissions: ['maintenance.close'] }))
        .as('maintenance.records.closure')
      router
        .get('maintenance/records/:id/history', [MaintenanceRecordsController, 'history'])
        .use(middleware.permission({ permissions: ['maintenance.view'] }))
        .as('maintenance.records.history')
      router
        .get('maintenance/records/:record_id/attachments', [
          MaintenanceRecordAttachmentsController,
          'index',
        ])
        .use(middleware.permission({ permissions: ['maintenance.view'] }))
        .as('maintenance.records.attachments.index')
      router
        .post('maintenance/records/:record_id/attachments', [
          MaintenanceRecordAttachmentsController,
          'store',
        ])
        .use(middleware.permission({ permissions: ['maintenance.update'] }))
        .as('maintenance.records.attachments.store')
      router
        .get('maintenance/records/:record_id/attachments/:id', [
          MaintenanceRecordAttachmentsController,
          'show',
        ])
        .use(middleware.permission({ permissions: ['maintenance.view'] }))
        .as('maintenance.records.attachments.show')
      router
        .delete('maintenance/records/:record_id/attachments/:id', [
          MaintenanceRecordAttachmentsController,
          'destroy',
        ])
        .use(middleware.permission({ permissions: ['maintenance.update'] }))
        .as('maintenance.records.attachments.destroy')

      router
        .get('failure-reports', [FailureReportsController, 'index'])
        .use(middleware.permission({ permissions: ['failure_reports.view'] }))
        .as('failure_reports.index')
      router
        .post('failure-reports', [FailureReportsController, 'store'])
        .use(middleware.permission({ permissions: ['failure_reports.create'] }))
        .as('failure_reports.store')
      router
        .get('failure-reports/:id', [FailureReportsController, 'show'])
        .use(middleware.permission({ permissions: ['failure_reports.view'] }))
        .as('failure_reports.show')
      router
        .put('failure-reports/:id', [FailureReportsController, 'update'])
        .use(middleware.permission({ permissions: ['failure_reports.manage'] }))
        .as('failure_reports.update')
      router
        .patch('failure-reports/:id', [FailureReportsController, 'update'])
        .use(middleware.permission({ permissions: ['failure_reports.manage'] }))
        .as('failure_reports.patch')
      router
        .patch('failure-reports/:id/close', [FailureReportsController, 'close'])
        .use(middleware.permission({ permissions: ['failure_reports.manage'] }))
        .as('failure_reports.close')
    })
    .use(middleware.auth())
    .as('inventory')
}

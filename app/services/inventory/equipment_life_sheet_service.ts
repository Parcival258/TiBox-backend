import Attachment from '#models/attachment'
import AuditLog from '#models/audit_log'
import Equipment from '#models/equipment'
import EquipmentAssignment from '#models/equipment_assignment'
import FailureReport from '#models/failure_report'
import MaintenanceRecord from '#models/maintenance_record'
import MaintenanceSchedule from '#models/maintenance_schedule'

export default class EquipmentLifeSheetService {
  async getByEquipmentId(equipmentId: string) {
    const equipment = await Equipment.query()
      .where('id', equipmentId)
      .whereNull('deleted_at')
      .preload('headquarter')
      .preload('location')
      .preload('currentResponsible')
      .preload('secondaryResponsible')
      .first()

    if (!equipment) {
      return null
    }

    const [
      assignments,
      maintenanceSchedules,
      maintenanceRecords,
      failureReports,
      attachments,
      auditLogs,
    ] = await Promise.all([
      EquipmentAssignment.query()
        .where('equipment_id', equipment.id)
        .preload('user')
        .preload('assigner')
        .orderBy('assigned_at', 'desc'),
      MaintenanceSchedule.query()
        .where('equipment_id', equipment.id)
        .preload('assignedTechnician')
        .orderBy('scheduled_for', 'desc'),
      MaintenanceRecord.query()
        .where('equipment_id', equipment.id)
        .preload('performer')
        .preload('maintenanceSchedule')
        .orderBy('performed_at', 'desc')
        .orderBy('scheduled_date', 'desc'),
      FailureReport.query()
        .where('equipment_id', equipment.id)
        .preload('reporter')
        .preload('maintenanceRecord')
        .orderBy('created_at', 'desc'),
      Attachment.query()
        .where('entity_type', 'equipment')
        .where('entity_id', equipment.id)
        .preload('uploader')
        .orderBy('created_at', 'desc'),
      AuditLog.query()
        .where('entity_type', 'equipment')
        .where('entity_id', equipment.id)
        .preload('user')
        .orderBy('created_at', 'desc')
        .limit(20),
    ])

    return {
      equipment,
      assignments,
      maintenanceSchedules,
      maintenanceRecords,
      failureReports,
      attachments,
      auditLogs,
      summary: {
        totalAssignments: assignments.length,
        totalMaintenanceRecords: maintenanceRecords.length,
        openFailureReports: failureReports.filter((report) => report.status !== 'closed').length,
        totalAttachments: attachments.length,
      },
    }
  }
}

import Attachment from '#models/attachment'
import AuditLog from '#models/audit_log'
import Equipment from '#models/equipment'
import EquipmentAssignment from '#models/equipment_assignment'
import FailureReport from '#models/failure_report'
import MaintenanceRecord from '#models/maintenance_record'
import MaintenanceSchedule from '#models/maintenance_schedule'

export default class EquipmentLifeSheetService {
  async getByEquipmentId(equipmentId: string, visibleToResponsibleId?: string) {
    const equipmentQuery = Equipment.query()
      .where('id', equipmentId)
      .whereNull('deleted_at')
      .preload('headquarter')
      .preload('location')
      .preload('currentResponsible')
      .preload('secondaryResponsible')

    if (visibleToResponsibleId) {
      equipmentQuery.where((builder) => {
        builder
          .where('current_responsible_id', visibleToResponsibleId)
          .orWhere('secondary_responsible_id', visibleToResponsibleId)
      })
    }

    const equipment = await equipmentQuery.first()

    if (!equipment) {
      return null
    }

    const [
      assignments,
      maintenanceSchedules,
      maintenanceRecords,
      failureReports,
      attachments,
      maintenanceRecordAttachments,
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
      Attachment.query()
        .where('entity_type', 'maintenance_record')
        .whereIn(
          'entity_id',
          MaintenanceRecord.query().where('equipment_id', equipment.id).select('id')
        )
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
      maintenanceRecordAttachments,
      auditLogs,
      technicalHistory: this.buildTechnicalHistory({
        assignments,
        failureReports,
        maintenanceRecords,
        maintenanceSchedules,
      }),
      summary: {
        totalAssignments: assignments.length,
        totalMaintenanceRecords: maintenanceRecords.length,
        openFailureReports: failureReports.filter((report) =>
          ['open', 'in_review'].includes(report.status)
        ).length,
        totalAttachments: attachments.length + maintenanceRecordAttachments.length,
      },
    }
  }

  private buildTechnicalHistory({
    assignments,
    failureReports,
    maintenanceRecords,
    maintenanceSchedules,
  }: {
    assignments: EquipmentAssignment[]
    failureReports: FailureReport[]
    maintenanceRecords: MaintenanceRecord[]
    maintenanceSchedules: MaintenanceSchedule[]
  }) {
    return [
      ...maintenanceRecords.map((record) => ({
        id: `maintenance-record:${record.id}`,
        sourceId: record.id,
        type: 'maintenance_record',
        date: record.performedAt ?? record.scheduledDate ?? record.createdAt,
        title: `Mantenimiento ${record.maintenanceType}`,
        detail: record.actionsTaken ?? record.description ?? record.diagnosis,
        status: record.status,
        priority: record.priority,
      })),
      ...maintenanceSchedules.map((schedule) => ({
        id: `maintenance-schedule:${schedule.id}`,
        sourceId: schedule.id,
        type: 'maintenance_schedule',
        date: schedule.scheduledFor,
        title: `Programacion ${schedule.maintenanceType}`,
        detail: schedule.notes,
        status: schedule.status,
        priority: schedule.priority,
      })),
      ...failureReports.map((report) => ({
        id: `failure-report:${report.id}`,
        sourceId: report.id,
        type: 'failure_report',
        date: report.closedAt ?? report.createdAt,
        title: report.title,
        detail: report.description,
        status: report.status,
        priority: report.priority,
      })),
      ...assignments.map((assignment) => ({
        id: `equipment-assignment:${assignment.id}`,
        sourceId: assignment.id,
        type: 'equipment_assignment',
        date: assignment.returnedAt ?? assignment.assignedAt,
        title: assignment.returnedAt ? 'Equipo devuelto' : 'Equipo asignado',
        detail: assignment.notes,
        status: assignment.returnedAt ? 'returned' : 'active',
        priority: null,
      })),
    ].sort((left, right) => right.date.toMillis() - left.date.toMillis())
  }
}

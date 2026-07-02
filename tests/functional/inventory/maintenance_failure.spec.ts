import AuditLog from '#models/audit_log'
import Alert from '#models/alert'
import Attachment from '#models/attachment'
import Equipment from '#models/equipment'
import FailureReport from '#models/failure_report'
import Headquarter from '#models/headquarter'
import Location from '#models/location'
import MaintenanceRecord from '#models/maintenance_record'
import MaintenanceSchedule from '#models/maintenance_schedule'
import Permission from '#models/permission'
import Role from '#models/role'
import User from '#models/user'
import app from '@adonisjs/core/services/app'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'
import { rm, writeFile } from 'node:fs/promises'
import { isAbsolute } from 'node:path'

type MaintenanceScheduleResponse = {
  id: string
  equipmentId: string
  status: string
  statusLabel: string
}

type MaintenanceRecordResponse = {
  id: string
  status: string
}

type FailureReportResponse = {
  closedAt: string | null
  id: string
  status: string
}

type AttachmentResponse = {
  fileName: string
  id: string
  uploadedBy: string | null
}

const uniqueSuffix = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

async function createActor(permissionSlugs: string[]) {
  const suffix = uniqueSuffix()
  const role = await Role.create({
    name: `Maintenance actor ${suffix}`,
    slug: `maintenance-actor-${suffix}`,
    isActive: true,
  })
  const permissions = await Promise.all(
    permissionSlugs.map((slug) =>
      Permission.updateOrCreate(
        { slug },
        {
          name: slug,
          slug,
          description: null,
        }
      )
    )
  )

  await role.related('permissions').sync(permissions.map((permission) => permission.id))

  return User.create({
    name: `Actor ${suffix}`,
    email: `actor-${suffix}@example.com`,
    password: 'password123',
    roleId: role.id,
    isActive: true,
  })
}

async function createEquipmentContext() {
  const suffix = uniqueSuffix()
  const headquarter = await Headquarter.create({
    name: `HQ maintenance ${suffix}`,
    isActive: true,
  })
  const location = await Location.create({
    headquarterId: headquarter.id,
    area: `Lab ${suffix}`,
    isActive: true,
  })
  const technician = await User.create({
    name: `Technician ${suffix}`,
    email: `technician-${suffix}@example.com`,
    password: 'password123',
    isActive: true,
  })
  const equipment = await Equipment.create({
    internalCode: `EQ-MAINT-${suffix}`,
    serial: `SN-MAINT-${suffix}`,
    type: 'Laptop',
    brand: 'Lenovo',
    model: 'ThinkPad',
    ownershipType: 'owned',
    status: 'active',
    headquarterId: headquarter.id,
    locationId: location.id,
  })

  return { equipment, technician }
}

test.group('Maintenance and failure modules', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('manages maintenance schedule catalogs and status flow', async ({ assert, client }) => {
    const { equipment, technician } = await createEquipmentContext()
    const actor = await createActor([
      'maintenance.view',
      'maintenance.create',
      'maintenance.update',
      'maintenance.close',
    ])

    const catalogsResponse = await client
      .get('/api/v1/maintenance/schedules/catalogs')
      .loginAs(actor)

    catalogsResponse.assertOk()
    assert.deepInclude(catalogsResponse.body().statuses, {
      label: 'Programado',
      value: 'scheduled',
    })
    assert.deepInclude(catalogsResponse.body().statuses, {
      label: 'Reprogramado',
      value: 'rescheduled',
    })

    const createResponse = await client.post('/api/v1/maintenance/schedules').loginAs(actor).json({
      equipmentId: equipment.id,
      maintenanceType: 'preventive',
      priority: 'high',
      scheduledFor: '2026-08-15',
      assignedTechnicianId: technician.id,
      frequencyMonths: 6,
      notes: 'Revision semestral.',
    })

    createResponse.assertCreated()
    createResponse.assertBodyContains({
      equipmentId: equipment.id,
      status: 'scheduled',
      statusLabel: 'Programado',
    })

    const scheduleId = (createResponse.body() as unknown as MaintenanceScheduleResponse).id
    const pendingResponse = await client
      .patch(`/api/v1/maintenance/schedules/${scheduleId}/pending`)
      .loginAs(actor)

    pendingResponse.assertOk()
    pendingResponse.assertBodyContains({ status: 'pending', statusLabel: 'Pendiente' })

    const startResponse = await client
      .patch(`/api/v1/maintenance/schedules/${scheduleId}/start`)
      .loginAs(actor)

    startResponse.assertOk()
    startResponse.assertBodyContains({ status: 'in_progress', statusLabel: 'En proceso' })

    const rescheduleResponse = await client
      .patch(`/api/v1/maintenance/schedules/${scheduleId}/reschedule`)
      .loginAs(actor)
      .json({
        scheduledFor: '2026-09-01',
        assignedTechnicianId: technician.id,
        notes: 'Cambio por disponibilidad del tecnico.',
      })

    rescheduleResponse.assertOk()
    rescheduleResponse.assertBodyContains({
      status: 'rescheduled',
      statusLabel: 'Reprogramado',
    })

    const finishResponse = await client
      .patch(`/api/v1/maintenance/schedules/${scheduleId}/finish`)
      .loginAs(actor)

    finishResponse.assertOk()
    finishResponse.assertBodyContains({ status: 'completed', statusLabel: 'Finalizado' })

    const listResponse = await client
      .get('/api/v1/maintenance/schedules')
      .loginAs(actor)
      .qs({ equipmentId: equipment.id })

    listResponse.assertOk()
    assert.equal((listResponse.body() as unknown as { meta: { total: number } }).meta.total, 1)
    assert.isNotNull(await AuditLog.findBy('entity_id', scheduleId))

    const cancelTarget = await MaintenanceSchedule.create({
      equipmentId: equipment.id,
      maintenanceType: 'preventive',
      status: 'scheduled',
      priority: 'medium',
      scheduledFor: DateTime.fromISO('2026-10-15'),
    })
    const cancelResponse = await client
      .patch(`/api/v1/maintenance/schedules/${cancelTarget.id}/cancel`)
      .loginAs(actor)

    cancelResponse.assertOk()
    cancelResponse.assertBodyContains({ status: 'cancelled', statusLabel: 'Cancelado' })
  })

  test('creates and closes maintenance records updating equipment and schedule', async ({
    assert,
    client,
  }) => {
    const { equipment, technician } = await createEquipmentContext()
    const actor = await createActor([
      'maintenance.view',
      'maintenance.create',
      'maintenance.update',
      'maintenance.close',
    ])
    const schedule = await MaintenanceSchedule.create({
      equipmentId: equipment.id,
      maintenanceType: 'corrective',
      status: 'scheduled',
      priority: 'medium',
      scheduledFor: DateTime.fromISO('2026-08-20'),
      assignedTechnicianId: technician.id,
    })

    const createResponse = await client.post('/api/v1/maintenance/records').loginAs(actor).json({
      equipmentId: equipment.id,
      maintenanceScheduleId: schedule.id,
      maintenanceType: 'corrective',
      status: 'in_progress',
      priority: 'medium',
      scheduledDate: '2026-08-20',
      performedBy: technician.id,
      description: 'Diagnostico inicial.',
    })

    createResponse.assertCreated()
    createResponse.assertBodyContains({ status: 'in_progress' })

    const recordId = (createResponse.body() as unknown as MaintenanceRecordResponse).id
    const closeResponse = await client
      .patch(`/api/v1/maintenance/records/${recordId}/close`)
      .loginAs(actor)
      .json({
        performedBy: technician.id,
        diagnosis: 'Memoria defectuosa.',
        actionsTaken: 'Cambio de modulo RAM.',
        cost: 120000,
        nextMaintenanceAt: '2026-12-20',
      })

    closeResponse.assertOk()
    closeResponse.assertBodyContains({ status: 'completed' })

    await equipment.refresh()
    await schedule.refresh()
    const record = await MaintenanceRecord.findOrFail(recordId)

    assert.equal(equipment.status, 'active')
    assert.exists(equipment.lastMaintenanceAt)
    assert.equal(schedule.status, 'completed')
    assert.equal(record.cost, '120000.00')
  })

  test('creates and closes failure reports', async ({ assert, client }) => {
    const { equipment } = await createEquipmentContext()
    const actor = await createActor([
      'failure_reports.view',
      'failure_reports.create',
      'failure_reports.manage',
    ])

    const createResponse = await client.post('/api/v1/failure-reports').loginAs(actor).json({
      equipmentId: equipment.id,
      title: 'Pantalla sin imagen',
      description: 'El equipo enciende pero no presenta video.',
      priority: 'critical',
    })

    createResponse.assertCreated()
    createResponse.assertBodyContains({
      status: 'open',
      reportedBy: actor.id,
    })

    const reportId = (createResponse.body() as unknown as FailureReportResponse).id
    const closeResponse = await client
      .patch(`/api/v1/failure-reports/${reportId}/close`)
      .loginAs(actor)
      .json({ status: 'resolved' })

    closeResponse.assertOk()
    closeResponse.assertBodyContains({ status: 'resolved' })

    const report = await FailureReport.findOrFail(reportId)

    assert.exists(report.closedAt)

    const alert = await Alert.query()
      .where('alert_key', `damaged_equipment_reported:${reportId}`)
      .firstOrFail()

    assert.equal(alert.status, 'resolved')
  })

  test('creates an alert when a failure is reported', async ({ assert, client }) => {
    const { equipment, technician } = await createEquipmentContext()
    const actor = await createActor([
      'failure_reports.view',
      'failure_reports.create',
      'failure_reports.manage',
    ])

    equipment.currentResponsibleId = technician.id
    await equipment.save()

    const createResponse = await client.post('/api/v1/failure-reports').loginAs(actor).json({
      equipmentId: equipment.id,
      title: 'Teclado no responde',
      description: 'Varias teclas no funcionan.',
      priority: 'high',
    })

    createResponse.assertCreated()
    const reportId = (createResponse.body() as unknown as FailureReportResponse).id
    const alert = await Alert.query()
      .where('alert_key', `damaged_equipment_reported:${reportId}`)
      .firstOrFail()

    assert.equal(alert.type, 'damaged_equipment_reported')
    assert.equal(alert.status, 'open')
    assert.equal(alert.severity, 'high')
    assert.equal(alert.equipmentId, equipment.id)
    assert.equal(alert.entityId, reportId)
    assert.isNull(alert.assignedTo)
  })

  test('manages maintenance record attachments', async ({ assert, client }) => {
    const { equipment, technician } = await createEquipmentContext()
    const actor = await createActor(['maintenance.view', 'maintenance.update'])
    const record = await MaintenanceRecord.create({
      equipmentId: equipment.id,
      maintenanceType: 'preventive',
      status: 'completed',
      priority: 'medium',
      performedAt: DateTime.local(),
      performedBy: technician.id,
      description: 'Revision con evidencia adjunta.',
    })
    const fixturePath = app.tmpPath(`maintenance-evidence-${uniqueSuffix()}.pdf`)

    await writeFile(fixturePath, Buffer.from('%PDF-1.4 evidence'))

    const uploadResponse = await client
      .post(`/api/v1/maintenance/records/${record.id}/attachments`)
      .loginAs(actor)
      .field('stage', 'execution')
      .file('file', fixturePath)

    await rm(fixturePath, { force: true })

    uploadResponse.assertCreated()
    uploadResponse.assertBodyContains({
      maintenanceStage: 'execution',
      uploadedBy: actor.id,
    })

    const attachmentId = (uploadResponse.body() as unknown as AttachmentResponse).id
    const storedAttachment = await Attachment.findOrFail(attachmentId)
    assert.isFalse(isAbsolute(storedAttachment.filePath))
    assert.match(storedAttachment.filePath, /^maintenance-records\//)
    const listResponse = await client
      .get(`/api/v1/maintenance/records/${record.id}/attachments`)
      .loginAs(actor)

    listResponse.assertOk()
    assert.isTrue(
      (listResponse.body() as unknown as AttachmentResponse[]).some(
        (attachment) => attachment.id === attachmentId
      )
    )

    const downloadResponse = await client
      .get(`/api/v1/maintenance/records/${record.id}/attachments/${attachmentId}`)
      .loginAs(actor)

    downloadResponse.assertOk()

    const deleteResponse = await client
      .delete(`/api/v1/maintenance/records/${record.id}/attachments/${attachmentId}`)
      .loginAs(actor)

    deleteResponse.assertNoContent()
  })
})

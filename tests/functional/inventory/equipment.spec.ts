import AuditLog from '#models/audit_log'
import Alert from '#models/alert'
import Attachment from '#models/attachment'
import Equipment from '#models/equipment'
import EquipmentAssignment from '#models/equipment_assignment'
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

type EquipmentIndexResponse = {
  meta: {
    total: number
  }
  data: Array<{
    currentResponsibleId: string | null
    id: string
    secondaryResponsibleId: string | null
    status: string
  }>
}

type EquipmentCatalogsResponse = {
  brands: string[]
  ownershipTypes: readonly string[]
  responsibles: Array<{
    id: string
  }>
  statuses: readonly string[]
  types: string[]
}

type EquipmentResponse = {
  id: string
  createdBy: string | null
  ipAddresses: string | null
  macAddress: string | null
  processor: string | null
  storageCapacityGb: number | null
  storageType: string | null
  status: string
  updatedBy: string | null
}

type EquipmentAssignmentResponse = {
  id: string
  returnedAt: string | null
  userId: string
}

type EquipmentLoanResponse = {
  id: string
  loanedAt: string | null
  status: string
  userId: string | null
}

type AttachmentResponse = {
  id: string
  fileName: string
  uploadedBy: string | null
}

type EquipmentLifeSheetResponse = {
  assignments: unknown[]
  attachments: unknown[]
  auditLogs: unknown[]
  equipment: {
    id: string
    ipAddresses: string | null
    macAddress: string | null
    processor: string | null
    secondaryResponsibleId: string | null
    storageCapacityGb: number | null
    storageType: string | null
  }
  failureReports: unknown[]
  maintenanceRecordAttachments: unknown[]
  maintenanceRecords: unknown[]
  maintenanceSchedules: unknown[]
  summary: {
    openFailureReports: number
    totalAssignments: number
    totalAttachments: number
    totalMaintenanceRecords: number
  }
  technicalHistory: Array<{
    sourceId: string
    type: string
  }>
}

const uniqueSuffix = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

async function createInventoryContext() {
  const suffix = uniqueSuffix()
  const headquarter = await Headquarter.create({
    name: `HQ ${suffix}`,
    city: 'Bogota',
    isActive: true,
  })

  const location = await Location.create({
    headquarterId: headquarter.id,
    area: `Area ${suffix}`,
    office: '101',
    isActive: true,
  })

  const secondaryLocation = await Location.create({
    headquarterId: headquarter.id,
    area: `Area secondary ${suffix}`,
    office: '102',
    isActive: true,
  })

  const user = await User.create({
    name: `Responsible ${suffix}`,
    email: `responsible-${suffix}@example.com`,
    password: 'password123',
    isActive: true,
  })

  const secondaryUser = await User.create({
    name: `Secondary ${suffix}`,
    email: `secondary-${suffix}@example.com`,
    password: 'password123',
    isActive: true,
  })

  return { headquarter, location, secondaryLocation, secondaryUser, suffix, user }
}

async function createInventoryActor() {
  const suffix = uniqueSuffix()
  const role = await Role.create({
    name: `Inventory manager ${suffix}`,
    slug: `inventory-manager-${suffix}`,
    isActive: true,
  })
  const permissionSlugs = [
    'equipment.view',
    'equipment.create',
    'equipment.update',
    'equipment.delete',
    'equipment.assign',
    'equipment.return',
    'equipment.attachments.manage',
  ]
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
    name: `Inventory actor ${suffix}`,
    email: `inventory-actor-${suffix}@example.com`,
    password: 'password123',
    roleId: role.id,
    isActive: true,
  })
}

async function createEndUserRole() {
  const role = await Role.updateOrCreate(
    { slug: 'user' },
    {
      name: 'Usuario',
      slug: 'user',
      isActive: true,
    }
  )
  const permissions = await Promise.all(
    ['equipment.view', 'failure_reports.view', 'failure_reports.create'].map((slug) =>
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

  return role
}

function equipmentPayload(context: Awaited<ReturnType<typeof createInventoryContext>>) {
  return {
    internalCode: `EQ-${context.suffix}`,
    assetTag: `ASSET-${context.suffix}`,
    serial: `SERIAL-${context.suffix}`,
    type: 'Laptop',
    brand: 'Lenovo',
    model: 'ThinkPad',
    ipAddresses: '192.168.1.10, 10.0.0.10',
    macAddress: 'AA:BB:CC:DD:EE:FF',
    processor: 'Intel Core i7',
    storageType: 'SSD',
    storageCapacityGb: 512,
    ownershipType: 'owned',
    status: 'active',
    headquarterId: context.headquarter.id,
    locationId: context.location.id,
    currentResponsibleId: context.user.id,
    secondaryResponsibleId: context.secondaryUser.id,
  }
}

test.group('Inventory equipment', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('creates equipment with primary and secondary responsible', async ({ assert, client }) => {
    const context = await createInventoryContext()
    const actor = await createInventoryActor()
    const response = await client
      .post('/api/v1/equipment')
      .loginAs(actor)
      .json(equipmentPayload(context))

    response.assertCreated()
    response.assertBodyContains({
      internalCode: `EQ-${context.suffix}`,
      currentResponsibleId: context.user.id,
      secondaryResponsibleId: context.secondaryUser.id,
      ipAddresses: '192.168.1.10, 10.0.0.10',
      macAddress: 'AA:BB:CC:DD:EE:FF',
      processor: 'Intel Core i7',
      storageType: 'SSD',
      storageCapacityGb: 512,
    })

    const equipment = await Equipment.findByOrFail('internal_code', `EQ-${context.suffix}`)
    assert.equal(equipment.secondaryResponsibleId, context.secondaryUser.id)
    assert.equal(equipment.ipAddresses, '192.168.1.10, 10.0.0.10')
    assert.equal(equipment.macAddress, 'AA:BB:CC:DD:EE:FF')
    assert.equal(equipment.processor, 'Intel Core i7')
    assert.equal(equipment.storageType, 'SSD')
    assert.equal(equipment.storageCapacityGb, 512)
    assert.equal(equipment.createdBy, actor.id)
    assert.equal(equipment.updatedBy, actor.id)

    const auditLog = await AuditLog.query()
      .where('action', 'equipment.created')
      .where('entity_id', equipment.id)
      .first()

    assert.exists(auditLog)
  })

  test('rejects duplicate equipment identifiers', async ({ client }) => {
    const context = await createInventoryContext()
    const actor = await createInventoryActor()
    const payload = equipmentPayload(context)

    await client.post('/api/v1/equipment').loginAs(actor).json(payload)

    const response = await client
      .post('/api/v1/equipment')
      .loginAs(actor)
      .json({
        ...payload,
        internalCode: `${payload.internalCode}-copy`,
      })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: {
        serial: ['serial is already in use'],
      },
    })
  })

  test('requires lease fields when equipment is leased', async ({ client }) => {
    const context = await createInventoryContext()
    const actor = await createInventoryActor()

    const response = await client
      .post('/api/v1/equipment')
      .loginAs(actor)
      .json({
        ...equipmentPayload(context),
        ownershipType: 'leased',
      })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: {
        leaseProvider: ['Lease provider is required for leased equipment'],
        leaseContractNumber: ['Lease contract number is required for leased equipment'],
        leaseUntil: ['Lease end date is required for leased equipment'],
      },
    })
  })

  test('filters equipment by secondary responsible', async ({ assert, client }) => {
    const context = await createInventoryContext()
    const actor = await createInventoryActor()
    const payload = equipmentPayload(context)

    await client.post('/api/v1/equipment').loginAs(actor).json(payload)

    const response = await client.get('/api/v1/equipment').loginAs(actor).qs({
      secondaryResponsibleId: context.secondaryUser.id,
    })

    response.assertOk()
    const body = response.body() as unknown as EquipmentIndexResponse

    assert.equal(body.meta.total, 1)
    assert.equal(body.data[0].secondaryResponsibleId, context.secondaryUser.id)
  })

  test('limits regular users to equipment under their responsibility', async ({
    assert,
    client,
  }) => {
    const context = await createInventoryContext()
    const actor = await createInventoryActor()
    const userRole = await createEndUserRole()

    context.user.roleId = userRole.id
    await context.user.save()

    const ownEquipmentResponse = await client
      .post('/api/v1/equipment')
      .loginAs(actor)
      .json(equipmentPayload(context))
    const ownEquipmentId = (ownEquipmentResponse.body() as unknown as EquipmentResponse).id

    await client
      .post('/api/v1/equipment')
      .loginAs(actor)
      .json({
        ...equipmentPayload(context),
        internalCode: `EQ-OTHER-${context.suffix}`,
        assetTag: `ASSET-OTHER-${context.suffix}`,
        serial: `SERIAL-OTHER-${context.suffix}`,
        currentResponsibleId: context.secondaryUser.id,
        secondaryResponsibleId: null,
      })

    const response = await client.get('/api/v1/equipment').loginAs(context.user)

    response.assertOk()
    const body = response.body() as unknown as EquipmentIndexResponse

    assert.equal(body.meta.total, 1)
    assert.equal(body.data[0].id, ownEquipmentId)
    assert.equal(body.data[0].currentResponsibleId, context.user.id)

    const lifeSheetResponse = await client
      .get(`/api/v1/equipment/${ownEquipmentId}/life-sheet`)
      .loginAs(context.user)

    lifeSheetResponse.assertOk()
  })

  test('returns catalogs for equipment forms and filters', async ({ assert, client }) => {
    const context = await createInventoryContext()
    const actor = await createInventoryActor()
    await client.post('/api/v1/equipment').loginAs(actor).json(equipmentPayload(context))

    const response = await client.get('/api/v1/equipment/catalogs').loginAs(actor)

    response.assertOk()
    const body = response.body() as unknown as EquipmentCatalogsResponse

    assert.include(body.statuses, 'active')
    assert.include(body.ownershipTypes, 'owned')
    assert.include(body.types, 'Laptop')
    assert.include(body.brands, 'Lenovo')
    assert.isTrue(body.responsibles.some((responsible) => responsible.id === context.user.id))
    assert.isTrue(
      body.responsibles.some((responsible) => responsible.id === context.secondaryUser.id)
    )
  })

  test('updates equipment and records updater', async ({ assert, client }) => {
    const context = await createInventoryContext()
    const actor = await createInventoryActor()
    const createResponse = await client
      .post('/api/v1/equipment')
      .loginAs(actor)
      .json(equipmentPayload(context))

    const equipmentId = (createResponse.body() as unknown as EquipmentResponse).id
    const response = await client.patch(`/api/v1/equipment/${equipmentId}`).loginAs(actor).json({
      brand: 'HP',
      model: 'EliteBook',
      ipAddresses: '172.16.0.20',
      macAddress: '11:22:33:44:55:66',
      processor: 'AMD Ryzen 7',
      storageType: 'NVMe',
      storageCapacityGb: 1024,
      notes: 'Equipo actualizado desde prueba funcional.',
    })

    response.assertOk()
    response.assertBodyContains({
      brand: 'HP',
      model: 'EliteBook',
      ipAddresses: '172.16.0.20',
      macAddress: '11:22:33:44:55:66',
      processor: 'AMD Ryzen 7',
      storageType: 'NVMe',
      storageCapacityGb: 1024,
      updatedBy: actor.id,
    })

    const equipment = await Equipment.findOrFail(equipmentId)
    assert.equal(equipment.brand, 'HP')
    assert.equal(equipment.ipAddresses, '172.16.0.20')
    assert.equal(equipment.macAddress, '11:22:33:44:55:66')
    assert.equal(equipment.processor, 'AMD Ryzen 7')
    assert.equal(equipment.storageType, 'NVMe')
    assert.equal(equipment.storageCapacityGb, 1024)
    assert.equal(equipment.updatedBy, actor.id)

    const auditLog = await AuditLog.query()
      .where('action', 'equipment.updated')
      .where('entity_id', equipment.id)
      .first()

    assert.exists(auditLog)
  })

  test('retires equipment, hides it by default, and exposes it through the retired filter', async ({
    assert,
    client,
  }) => {
    const context = await createInventoryContext()
    const actor = await createInventoryActor()
    const createResponse = await client
      .post('/api/v1/equipment')
      .loginAs(actor)
      .json(equipmentPayload(context))
    const equipmentId = (createResponse.body() as unknown as EquipmentResponse).id

    const response = await client.delete(`/api/v1/equipment/${equipmentId}`).loginAs(actor)

    response.assertNoContent()

    const equipment = await Equipment.findOrFail(equipmentId)
    assert.exists(equipment.deletedAt)
    assert.equal(equipment.status, 'retired')

    const showResponse = await client.get(`/api/v1/equipment/${equipmentId}`).loginAs(actor)
    showResponse.assertOk()

    const indexResponse = await client
      .get('/api/v1/equipment')
      .loginAs(actor)
      .qs({
        search: `EQ-${context.suffix}`,
      })
    const body = indexResponse.body() as unknown as EquipmentIndexResponse
    assert.equal(body.meta.total, 0)

    const retiredResponse = await client
      .get('/api/v1/equipment')
      .loginAs(actor)
      .qs({
        search: `EQ-${context.suffix}`,
        status: 'retired',
      })
    retiredResponse.assertOk()

    const retiredBody = retiredResponse.body() as unknown as EquipmentIndexResponse
    assert.equal(retiredBody.meta.total, 1)
    assert.equal(retiredBody.data[0].id, equipmentId)
    assert.equal(retiredBody.data[0].status, 'retired')

    const lifeSheetResponse = await client
      .get(`/api/v1/equipment/${equipmentId}/life-sheet`)
      .loginAs(actor)
    lifeSheetResponse.assertOk()
    assert.equal(
      (lifeSheetResponse.body() as unknown as EquipmentLifeSheetResponse).equipment.id,
      equipmentId
    )

    const restoreResponse = await client
      .patch(`/api/v1/equipment/${equipmentId}/restore`)
      .loginAs(actor)

    restoreResponse.assertOk()
    restoreResponse.assertBodyContains({
      id: equipmentId,
      status: 'active',
    })

    await equipment.refresh()
    assert.isNull(equipment.deletedAt)
    assert.equal(equipment.status, 'active')

    const restoredIndexResponse = await client
      .get('/api/v1/equipment')
      .loginAs(actor)
      .qs({
        search: `EQ-${context.suffix}`,
      })
    const restoredBody = restoredIndexResponse.body() as unknown as EquipmentIndexResponse
    assert.equal(restoredBody.meta.total, 1)
    assert.equal(restoredBody.data[0].id, equipmentId)

    const restoredRetiredResponse = await client
      .get('/api/v1/equipment')
      .loginAs(actor)
      .qs({
        search: `EQ-${context.suffix}`,
        status: 'retired',
      })
    const restoredRetiredBody = restoredRetiredResponse.body() as unknown as EquipmentIndexResponse
    assert.equal(restoredRetiredBody.meta.total, 0)
  })

  test('assigns and returns equipment', async ({ assert, client }) => {
    const context = await createInventoryContext()
    const actor = await createInventoryActor()
    const createResponse = await client
      .post('/api/v1/equipment')
      .loginAs(actor)
      .json({
        ...equipmentPayload(context),
        currentResponsibleId: null,
      })
    const equipmentId = (createResponse.body() as unknown as EquipmentResponse).id

    const assignResponse = await client
      .post(`/api/v1/equipment/${equipmentId}/assignments`)
      .loginAs(actor)
      .json({
        userId: context.user.id,
        notes: 'Asignacion desde prueba funcional.',
      })

    assignResponse.assertCreated()
    assignResponse.assertBodyContains({
      userId: context.user.id,
      assignedBy: actor.id,
    })

    let equipment = await Equipment.findOrFail(equipmentId)
    assert.equal(equipment.currentResponsibleId, context.user.id)

    const assignmentId = (assignResponse.body() as unknown as EquipmentAssignmentResponse).id
    const returnResponse = await client
      .patch(`/api/v1/equipment/${equipmentId}/assignments/current/return`)
      .loginAs(actor)
      .json({
        notes: 'Retorno desde prueba funcional.',
      })

    returnResponse.assertOk()
    assert.isNotNull((returnResponse.body() as unknown as EquipmentAssignmentResponse).returnedAt)

    equipment = await Equipment.findOrFail(equipmentId)
    assert.isNull(equipment.currentResponsibleId)

    const assignment = await EquipmentAssignment.findOrFail(assignmentId)
    assert.isNotNull(assignment.returnedAt)
  })

  test('manages equipment attachments', async ({ assert, client }) => {
    const context = await createInventoryContext()
    const actor = await createInventoryActor()
    const createResponse = await client
      .post('/api/v1/equipment')
      .loginAs(actor)
      .json(equipmentPayload(context))
    const equipmentId = (createResponse.body() as unknown as EquipmentResponse).id
    const fixturePath = app.tmpPath(`warranty-${context.suffix}.png`)

    await writeFile(
      fixturePath,
      Buffer.from(
        '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082',
        'hex'
      )
    )

    const uploadResponse = await client
      .post(`/api/v1/equipment/${equipmentId}/attachments`)
      .loginAs(actor)
      .file('file', fixturePath)

    await rm(fixturePath, { force: true })

    uploadResponse.assertCreated()
    uploadResponse.assertBodyContains({
      uploadedBy: actor.id,
    })

    const uploadBody = uploadResponse.body() as unknown as AttachmentResponse
    assert.match(uploadBody.fileName, /^warranty-.+\.png$/)

    const attachmentId = uploadBody.id
    const storedAttachment = await Attachment.findOrFail(attachmentId)
    assert.isFalse(isAbsolute(storedAttachment.filePath))
    assert.match(storedAttachment.filePath, /^equipment\//)
    const listResponse = await client
      .get(`/api/v1/equipment/${equipmentId}/attachments`)
      .loginAs(actor)

    listResponse.assertOk()
    assert.isTrue(
      (listResponse.body() as unknown as AttachmentResponse[]).some(
        (attachment) => attachment.id === attachmentId
      )
    )

    const downloadResponse = await client
      .get(`/api/v1/equipment/${equipmentId}/attachments/${attachmentId}`)
      .loginAs(actor)

    downloadResponse.assertOk()

    const deleteResponse = await client
      .delete(`/api/v1/equipment/${equipmentId}/attachments/${attachmentId}`)
      .loginAs(actor)

    deleteResponse.assertNoContent()

    const attachment = await Attachment.find(attachmentId)
    assert.isNull(attachment)
  })

  test('returns equipment life sheet with operational history', async ({ assert, client }) => {
    const context = await createInventoryContext()
    const actor = await createInventoryActor()
    const createResponse = await client
      .post('/api/v1/equipment')
      .loginAs(actor)
      .json(equipmentPayload(context))
    const equipmentId = (createResponse.body() as unknown as EquipmentResponse).id

    const schedule = await MaintenanceSchedule.create({
      equipmentId,
      maintenanceType: 'preventive',
      status: 'scheduled',
      priority: 'medium',
      scheduledFor: DateTime.local().plus({ days: 15 }),
      assignedTechnicianId: context.secondaryUser.id,
      frequencyMonths: 6,
      notes: 'Revision preventiva programada.',
      createdBy: actor.id,
      updatedBy: actor.id,
    })

    await MaintenanceRecord.create({
      equipmentId,
      maintenanceScheduleId: schedule.id,
      maintenanceType: 'preventive',
      status: 'completed',
      priority: 'medium',
      scheduledDate: DateTime.local(),
      performedAt: DateTime.local(),
      performedBy: context.secondaryUser.id,
      description: 'Mantenimiento completado.',
      actionsTaken: 'Limpieza y diagnostico.',
      cost: '0',
      createdBy: actor.id,
      updatedBy: actor.id,
    })

    await FailureReport.create({
      equipmentId,
      reportedBy: context.user.id,
      title: 'Pantalla intermitente',
      description: 'La pantalla presenta parpadeos.',
      status: 'open',
      priority: 'high',
    })

    await Attachment.create({
      entityType: 'equipment',
      entityId: equipmentId,
      fileName: 'diagnostico.pdf',
      filePath: app.tmpPath('diagnostico.pdf'),
      mimeType: 'application/pdf',
      sizeBytes: 128,
      uploadedBy: actor.id,
    })

    const response = await client.get(`/api/v1/equipment/${equipmentId}/life-sheet`).loginAs(actor)

    response.assertOk()
    const body = response.body() as unknown as EquipmentLifeSheetResponse

    assert.equal(body.equipment.id, equipmentId)
    assert.equal(body.equipment.secondaryResponsibleId, context.secondaryUser.id)
    assert.equal(body.equipment.ipAddresses, '192.168.1.10, 10.0.0.10')
    assert.equal(body.equipment.macAddress, 'AA:BB:CC:DD:EE:FF')
    assert.equal(body.equipment.processor, 'Intel Core i7')
    assert.equal(body.equipment.storageType, 'SSD')
    assert.equal(body.equipment.storageCapacityGb, 512)
    assert.lengthOf(body.maintenanceSchedules, 1)
    assert.lengthOf(body.maintenanceRecords, 1)
    assert.lengthOf(body.failureReports, 1)
    assert.lengthOf(body.attachments, 1)
    assert.lengthOf(body.maintenanceRecordAttachments, 0)
    assert.isTrue(body.technicalHistory.some((item) => item.sourceId === equipmentId) === false)
    assert.isTrue(body.technicalHistory.some((item) => item.type === 'maintenance_record'))
    assert.isTrue(body.technicalHistory.some((item) => item.type === 'failure_report'))
    assert.isAtLeast(body.auditLogs.length, 1)
    assert.equal(body.summary.totalMaintenanceRecords, 1)
    assert.equal(body.summary.openFailureReports, 1)
    assert.equal(body.summary.totalAttachments, 1)
  })

  test('allows a user to request equipment and a manager to approve it', async ({
    assert,
    client,
  }) => {
    const context = await createInventoryContext()
    const actor = await createInventoryActor()
    const userRole = await createEndUserRole()
    context.user.roleId = userRole.id
    await context.user.save()

    const equipmentResponse = await client
      .post('/api/v1/equipment')
      .loginAs(actor)
      .json(equipmentPayload(context))
    const equipmentId = (equipmentResponse.body() as unknown as EquipmentResponse).id

    const requestableResponse = await client
      .get('/api/v1/equipment-loans/requestable-equipment')
      .loginAs(context.user)
    requestableResponse.assertOk()
    assert.isTrue(
      (requestableResponse.body() as Array<{ id: string }>).some((item) => item.id === equipmentId)
    )

    const requestResponse = await client
      .post('/api/v1/equipment-loans/requests')
      .loginAs(context.user)
      .json({
        estimatedReturnAt: DateTime.local().plus({ days: 7 }).toISODate(),
        requestedItem: 'Trabajo remoto',
        notes: 'Necesito el equipo durante una semana.',
      })

    requestResponse.assertCreated()
    const requestedLoan = requestResponse.body() as unknown as EquipmentLoanResponse
    assert.equal(requestedLoan.status, 'requested')
    assert.equal(requestedLoan.userId, context.user.id)
    assert.isNull(requestedLoan.loanedAt)

    const requestAlert = await Alert.findByOrFail(
      'alert_key',
      `equipment_loan_requested:${requestedLoan.id}`
    )
    assert.equal(requestAlert.status, 'open')
    assert.equal(requestAlert.type, 'equipment_loan_requested')
    assert.equal(requestAlert.entityId, requestedLoan.id)

    const realtimeTokenResponse = await client.post('/api/v1/realtime/token').loginAs(actor)
    realtimeTokenResponse.assertOk()

    const directLoanResponse = await client
      .post('/api/v1/equipment-loans')
      .loginAs(context.user)
      .json({
        equipmentId,
        estimatedReturnAt: DateTime.local().plus({ days: 7 }).toISODate(),
        requestedItem: 'Intento directo',
        userId: context.user.id,
      })
    directLoanResponse.assertForbidden()

    const approvalResponse = await client
      .patch(`/api/v1/equipment-loans/${requestedLoan.id}/approve`)
      .loginAs(actor)
      .json({ equipmentId })
    approvalResponse.assertOk()
    const approvedLoan = approvalResponse.body() as unknown as EquipmentLoanResponse
    assert.equal(approvedLoan.status, 'active')
    assert.isNotNull(approvedLoan.loanedAt)
    await requestAlert.refresh()
    assert.equal(requestAlert.status, 'resolved')

    const ownLoansResponse = await client.get('/api/v1/equipment-loans').loginAs(context.user)
    ownLoansResponse.assertOk()
    const ownLoans = ownLoansResponse.body() as unknown as { data: EquipmentLoanResponse[] }
    assert.lengthOf(ownLoans.data, 1)
    assert.equal(ownLoans.data[0].id, requestedLoan.id)
  })
})

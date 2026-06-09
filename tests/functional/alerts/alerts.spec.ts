import Alert from '#models/alert'
import Equipment from '#models/equipment'
import FailureReport from '#models/failure_report'
import Headquarter from '#models/headquarter'
import Location from '#models/location'
import MaintenanceSchedule from '#models/maintenance_schedule'
import Permission from '#models/permission'
import Role from '#models/role'
import RealtimeTokenService from '#services/realtime/realtime_token_service'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

type AlertRunResponse = {
  alerts: Array<{
    id: string
    status: string
    statusLabel: string
    type: string
  }>
  generated: number
}

const uniqueSuffix = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

async function createActor(permissionSlugs: string[]) {
  const suffix = uniqueSuffix()
  const role = await Role.create({
    name: `Alert actor ${suffix}`,
    slug: `alert-actor-${suffix}`,
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
    name: `Alert actor ${suffix}`,
    email: `alert-actor-${suffix}@example.com`,
    password: 'password123',
    roleId: role.id,
    isActive: true,
  })
}

async function createAlertContext() {
  const suffix = uniqueSuffix()
  const headquarter = await Headquarter.create({
    name: `HQ alerts ${suffix}`,
    isActive: true,
  })
  const location = await Location.create({
    headquarterId: headquarter.id,
    area: `Alerts ${suffix}`,
    isActive: true,
  })
  const responsible = await User.create({
    name: `Responsible ${suffix}`,
    email: `responsible-alerts-${suffix}@example.com`,
    password: 'password123',
    isActive: true,
  })
  const equipment = await Equipment.create({
    internalCode: `EQ-ALERT-${suffix}`,
    serial: `SN-ALERT-${suffix}`,
    type: 'Laptop',
    brand: 'Lenovo',
    model: 'ThinkPad',
    ownershipType: 'leased',
    status: 'active',
    headquarterId: headquarter.id,
    locationId: location.id,
    currentResponsibleId: responsible.id,
    lastMaintenanceAt: DateTime.fromISO('2025-01-01'),
    warrantyUntil: DateTime.fromISO('2026-06-20'),
    leaseUntil: DateTime.fromISO('2026-07-15'),
  })

  await MaintenanceSchedule.create({
    equipmentId: equipment.id,
    maintenanceType: 'preventive',
    status: 'scheduled',
    priority: 'medium',
    scheduledFor: DateTime.fromISO('2026-06-02'),
    assignedTechnicianId: responsible.id,
  })

  await FailureReport.create({
    equipmentId: equipment.id,
    reportedBy: responsible.id,
    title: 'Equipo no enciende',
    description: 'Falla critica reportada por el usuario.',
    status: 'open',
    priority: 'critical',
  })

  return { equipment, responsible }
}

test.group('Alerts', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('generates, lists, acknowledges and resolves automatic alerts', async ({
    assert,
    client,
  }) => {
    const actor = await createActor(['alerts.view', 'alerts.manage'])
    const { equipment } = await createAlertContext()

    const catalogsResponse = await client.get('/api/v1/alerts/catalogs').loginAs(actor)

    catalogsResponse.assertOk()
    assert.deepInclude(catalogsResponse.body().types, {
      label: 'Garantia proxima a vencer',
      value: 'warranty_expiring',
    })
    assert.deepInclude(catalogsResponse.body().channels, {
      label: 'Correo',
      value: 'email',
    })

    const runResponse = await client.post('/api/v1/alerts/run').loginAs(actor).json({
      referenceDate: '2026-06-01',
    })

    runResponse.assertCreated()
    const runBody = runResponse.body() as unknown as AlertRunResponse

    assert.isAtLeast(runBody.generated, 5)
    assert.isTrue(runBody.alerts.some((alert) => alert.type === 'maintenance_overdue_6_months'))
    assert.isTrue(runBody.alerts.some((alert) => alert.type === 'warranty_expiring'))
    assert.isTrue(runBody.alerts.some((alert) => alert.type === 'lease_expiring'))
    assert.isTrue(runBody.alerts.some((alert) => alert.type === 'maintenance_tomorrow'))
    assert.isTrue(runBody.alerts.some((alert) => alert.type === 'damaged_equipment_reported'))
    assert.equal(runBody.alerts[0].statusLabel, 'Abierta')

    const listResponse = await client
      .get('/api/v1/alerts')
      .loginAs(actor)
      .qs({ equipmentId: equipment.id, status: 'open' })

    listResponse.assertOk()
    assert.isAtLeast((listResponse.body() as unknown as { meta: { total: number } }).meta.total, 5)

    const alert = await Alert.query().where('equipment_id', equipment.id).firstOrFail()
    const acknowledgeResponse = await client
      .patch(`/api/v1/alerts/${alert.id}/acknowledge`)
      .loginAs(actor)

    acknowledgeResponse.assertOk()
    acknowledgeResponse.assertBodyContains({
      status: 'acknowledged',
      statusLabel: 'Reconocida',
    })

    const resolveResponse = await client.patch(`/api/v1/alerts/${alert.id}/resolve`).loginAs(actor)

    resolveResponse.assertOk()
    resolveResponse.assertBodyContains({
      status: 'resolved',
      statusLabel: 'Resuelta',
    })
  })

  test('assigns failure alerts from common queue and supports self assignment', async ({
    assert,
    client,
  }) => {
    const manager = await createActor(['alerts.view', 'alerts.manage'])
    const technician = await createActor(['alerts.view'])
    const { equipment } = await createAlertContext()

    const runResponse = await client.post('/api/v1/alerts/run').loginAs(manager).json({
      referenceDate: '2026-06-01',
    })

    runResponse.assertCreated()
    const failureAlert = await Alert.query()
      .where('equipment_id', equipment.id)
      .where('type', 'damaged_equipment_reported')
      .firstOrFail()

    assert.isNull(failureAlert.assignedTo)

    const assignResponse = await client
      .patch(`/api/v1/alerts/${failureAlert.id}/assign`)
      .loginAs(manager)
      .json({ assignedTo: technician.id })

    assignResponse.assertOk()
    assignResponse.assertBodyContains({
      assignedTo: technician.id,
    })

    const unassignedAlert = await Alert.create({
      alertKey: `damaged_equipment_reported:self-${uniqueSuffix()}`,
      type: 'damaged_equipment_reported',
      severity: 'medium',
      status: 'open',
      title: 'Falla reportada en equipo',
      message: 'Falla pendiente de asignacion.',
      entityType: 'failure_report',
      entityId: failureAlert.entityId,
      equipmentId: equipment.id,
      assignedTo: null,
      channels: ['internal'],
    })

    const selfAssignResponse = await client
      .patch(`/api/v1/alerts/${unassignedAlert.id}/self-assign`)
      .loginAs(technician)

    selfAssignResponse.assertOk()
    selfAssignResponse.assertBodyContains({
      assignedTo: technician.id,
    })

    const noteResponse = await client
      .patch(`/api/v1/alerts/${unassignedAlert.id}/note`)
      .loginAs(technician)
      .json({ note: 'Pendiente de repuesto para cerrar el caso.' })

    noteResponse.assertOk()

    await unassignedAlert.refresh()
    const notes = unassignedAlert.metadata?.notes as Array<{ note: string }> | undefined

    assert.isArray(notes)
    assert.equal(notes?.[0]?.note, 'Pendiente de repuesto para cerrar el caso.')

    const dismissResponse = await client
      .patch(`/api/v1/alerts/${unassignedAlert.id}/dismiss`)
      .loginAs(technician)

    dismissResponse.assertOk()
    dismissResponse.assertBodyContains({
      status: 'dismissed',
      statusLabel: 'Quitada',
    })
  })

  test('issues realtime tokens only to alert viewers', async ({ assert, client }) => {
    const viewer = await createActor(['alerts.view'])
    const reporter = await createActor(['failure_reports.view'])
    const restrictedUser = await createActor([])

    const tokenResponse = await client.post('/api/v1/realtime/token').loginAs(viewer)

    tokenResponse.assertOk()
    const token = (tokenResponse.body() as { data: { token: string } }).data.token
    const payload = new RealtimeTokenService().verify(token)

    assert.equal(payload?.userId, viewer.id)
    assert.include(payload?.permissions, 'alerts.view')

    const reporterTokenResponse = await client.post('/api/v1/realtime/token').loginAs(reporter)

    reporterTokenResponse.assertOk()
    const reporterToken = (reporterTokenResponse.body() as { data: { token: string } }).data.token
    const reporterPayload = new RealtimeTokenService().verify(reporterToken)

    assert.equal(reporterPayload?.userId, reporter.id)
    assert.include(reporterPayload?.permissions, 'failure_reports.view')

    const forbiddenResponse = await client.post('/api/v1/realtime/token').loginAs(restrictedUser)

    forbiddenResponse.assertForbidden()
  })
})

import Permission from '#models/permission'
import Role from '#models/role'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

async function createUserWithPermissions(permissionSlugs: string[]) {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const role = await Role.create({
    name: `Role ${suffix}`,
    slug: `role-${suffix}`,
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

  const user = await User.create({
    name: `User ${suffix}`,
    email: `user-${suffix}@example.com`,
    password: 'password123',
    roleId: role.id,
    isActive: true,
  })

  return { role, user }
}

test.group('Authentication and authorization', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('rejects invalid login credentials', async ({ client }) => {
    const response = await client.post('/api/v1/auth/login').json({
      email: 'missing@example.com',
      password: 'wrong-password',
    })

    response.assertUnauthorized()
    response.assertBodyContains({ message: 'Invalid credentials' })
  })

  test('rate limits repeated login attempts for the same identity', async ({ client }) => {
    const payload = {
      email: 'rate-limited@example.com',
      password: 'wrong-password',
    }

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await client.post('/api/v1/auth/login').json(payload)
      response.assertUnauthorized()
    }

    const response = await client.post('/api/v1/auth/login').json(payload)

    response.assertStatus(429)
    response.assertHeader('retry-after')
  })

  test('returns authenticated user with role and permissions', async ({ assert, client }) => {
    const { role, user } = await createUserWithPermissions(['equipment.view'])

    const response = await client.post('/api/v1/auth/login').json({
      email: user.email,
      password: 'password123',
    })

    response.assertOk()

    const body = response.body() as unknown as {
      data: {
        user: {
          permissions: string[]
          role: {
            slug: string
          }
        }
      }
    }

    assert.include(body.data.user.permissions, 'equipment.view')
    assert.equal(body.data.user.role.slug, role.slug)
  })

  test('blocks protected inventory routes without session', async ({ client }) => {
    const response = await client.get('/api/v1/equipment')

    response.assertUnauthorized()
  })

  test('blocks authenticated users without required permission', async ({ client }) => {
    const { user } = await createUserWithPermissions([])
    const response = await client.get('/api/v1/equipment').loginAs(user)

    response.assertForbidden()
  })

  test('allows authenticated users with required permission', async ({ client }) => {
    const { user } = await createUserWithPermissions(['equipment.view'])
    const response = await client.get('/api/v1/equipment').loginAs(user)

    response.assertOk()
  })

  test('protects account creation behind users.create permission', async ({ client }) => {
    const response = await client.post('/api/v1/auth/signup').json({
      name: 'Open Signup',
      email: 'open-signup@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    })

    response.assertUnauthorized()
  })
})

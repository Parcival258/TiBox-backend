import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  name: vine.string().trim().minLength(2).maxLength(150),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})

export const userCreateValidator = vine.create({
  name: vine.string().trim().minLength(2).maxLength(150),
  email: email(),
  password: password(),
  roleId: vine.string().uuid().optional(),
  phone: vine.string().trim().maxLength(50).optional(),
  jobTitle: vine.string().trim().maxLength(120).optional(),
  department: vine.string().trim().maxLength(120).optional(),
  isActive: vine.boolean().optional(),
})

export const userUpdateValidator = vine.create({
  name: vine.string().trim().minLength(2).maxLength(150),
  email: email(),
  password: password().optional(),
  roleId: vine.string().uuid().optional(),
  phone: vine.string().trim().maxLength(50).optional(),
  jobTitle: vine.string().trim().maxLength(120).optional(),
  department: vine.string().trim().maxLength(120).optional(),
  isActive: vine.boolean().optional(),
})

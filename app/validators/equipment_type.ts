import vine from '@vinejs/vine'

export const equipmentTypeValidator = vine.create({
  name: vine.string().trim().minLength(2).maxLength(100),
  description: vine.string().trim().optional(),
  isActive: vine.boolean().optional(),
})

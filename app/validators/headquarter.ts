import vine from '@vinejs/vine'

export const headquarterValidator = vine.create({
  name: vine.string().trim().minLength(2).maxLength(150),
  city: vine.string().trim().maxLength(120).optional(),
  address: vine.string().trim().optional(),
  description: vine.string().trim().optional(),
  isActive: vine.boolean().optional(),
})

import vine from '@vinejs/vine'

export const locationValidator = vine.create({
  headquarterId: vine.string().uuid(),
  floor: vine.string().trim().maxLength(50).optional(),
  area: vine.string().trim().maxLength(120).optional(),
  office: vine.string().trim().maxLength(120).optional(),
  description: vine.string().trim().optional(),
  isActive: vine.boolean().optional(),
})

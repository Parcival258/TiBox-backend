import vine from '@vinejs/vine'

export const assignEquipmentValidator = vine.create({
  userId: vine.string().uuid(),
  assignedAt: vine.date().optional(),
  notes: vine.string().trim().optional(),
})

export const returnEquipmentValidator = vine.create({
  returnedAt: vine.date().optional(),
  notes: vine.string().trim().optional(),
})

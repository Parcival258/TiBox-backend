import vine from '@vinejs/vine'

export const createEquipmentGroupValidator = vine.create({
  name: vine.string().trim().minLength(2).maxLength(120),
  description: vine.string().trim().optional(),
  equipmentIds: vine.array(vine.string().uuid()).optional(),
})

export const updateEquipmentGroupValidator = vine.create({
  name: vine.string().trim().minLength(2).maxLength(120).optional(),
  description: vine.string().trim().optional(),
  equipmentIds: vine.array(vine.string().uuid()).optional(),
})

export const equipmentGroupEquipmentValidator = vine.create({
  equipmentId: vine.string().uuid(),
})

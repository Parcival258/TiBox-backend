import vine from '@vinejs/vine'

export const listEquipmentLoansValidator = vine.create({
  equipmentId: vine.string().uuid().optional(),
  page: vine.number().positive().optional(),
  perPage: vine.number().positive().max(100).optional(),
  status: vine.enum(['active', 'returned', 'overdue', 'cancelled']).optional(),
})

export const createEquipmentLoanValidator = vine.create({
  borrowerName: vine.string().trim().minLength(2).maxLength(150).optional(),
  equipmentId: vine.string().uuid(),
  estimatedReturnAt: vine.date(),
  loanedAt: vine.date().optional(),
  notes: vine.string().trim().optional(),
  receivedSignatureImage: vine.string().trim().optional(),
  requestedAt: vine.date().optional(),
  requestedItem: vine.string().trim().minLength(2),
  requestMode: vine.string().trim().maxLength(80).optional(),
  signatureImage: vine.string().trim().optional(),
  userId: vine.string().uuid().optional(),
})

export const returnEquipmentLoanValidator = vine.create({
  notes: vine.string().trim().optional(),
  receivedSignatureImage: vine.string().trim().optional(),
  returnedAt: vine.date().optional(),
})

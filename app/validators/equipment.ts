import vine from '@vinejs/vine'

export const equipmentValidator = vine.create({
  internalCode: vine.string().trim().minLength(2).maxLength(100),
  assetTag: vine.string().trim().maxLength(100).optional(),
  serial: vine.string().trim().minLength(2).maxLength(150),
  type: vine.string().trim().minLength(2).maxLength(100),
  brand: vine.string().trim().maxLength(120).optional(),
  model: vine.string().trim().maxLength(120).optional(),
  ownershipType: vine.enum(['owned', 'leased']).optional(),
  status: vine
    .enum(['active', 'inactive', 'in_maintenance', 'damaged', 'retired', 'lost'])
    .optional(),
  headquarterId: vine.string().uuid().optional(),
  locationId: vine.string().uuid().optional(),
  currentResponsibleId: vine.string().uuid().optional(),
  purchaseDate: vine.date().optional(),
  warrantyUntil: vine.date().optional(),
  leaseProvider: vine.string().trim().maxLength(150).optional(),
  leaseContractNumber: vine.string().trim().maxLength(150).optional(),
  leaseUntil: vine.date().optional(),
  lastMaintenanceAt: vine.date().optional(),
  nextMaintenanceAt: vine.date().optional(),
  notes: vine.string().trim().optional(),
})

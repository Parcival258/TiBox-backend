import vine from '@vinejs/vine'

export const equipmentStatuses = [
  'active',
  'inactive',
  'in_maintenance',
  'damaged',
  'retired',
  'lost',
] as const

export const ownershipTypes = ['owned', 'leased'] as const

const leaseFields = {
  leaseProvider: vine.string().trim().maxLength(150).optional(),
  leaseContractNumber: vine.string().trim().maxLength(150).optional(),
  leaseUntil: vine.date().optional(),
}

const equipmentFields = {
  internalCode: vine.string().trim().minLength(2).maxLength(100),
  assetTag: vine.string().trim().maxLength(100).optional(),
  serial: vine.string().trim().minLength(2).maxLength(150),
  type: vine.string().trim().minLength(2).maxLength(100),
  brand: vine.string().trim().maxLength(120).optional(),
  model: vine.string().trim().maxLength(120).optional(),
  ipAddresses: vine.string().trim().optional(),
  macAddress: vine.string().trim().maxLength(80).optional(),
  processor: vine.string().trim().maxLength(150).optional(),
  storageType: vine.string().trim().maxLength(80).optional(),
  storageCapacityGb: vine.number().min(0).optional(),
  ownershipType: vine.enum(ownershipTypes).optional(),
  status: vine.enum(equipmentStatuses).optional(),
  headquarterId: vine.string().uuid().optional(),
  locationId: vine.string().uuid().optional(),
  currentResponsibleId: vine.string().uuid().optional(),
  secondaryResponsibleId: vine.string().uuid().optional(),
  purchaseDate: vine.date().optional(),
  warrantyUntil: vine.date().optional(),
  ...leaseFields,
  lastMaintenanceAt: vine.date().optional(),
  nextMaintenanceAt: vine.date().optional(),
  notes: vine.string().trim().optional(),
}

export const createEquipmentValidator = vine.create(equipmentFields)

export const updateEquipmentValidator = vine.create({
  internalCode: vine.string().trim().minLength(2).maxLength(100).optional(),
  assetTag: vine.string().trim().maxLength(100).optional(),
  serial: vine.string().trim().minLength(2).maxLength(150).optional(),
  type: vine.string().trim().minLength(2).maxLength(100).optional(),
  brand: vine.string().trim().maxLength(120).optional(),
  model: vine.string().trim().maxLength(120).optional(),
  ipAddresses: vine.string().trim().optional(),
  macAddress: vine.string().trim().maxLength(80).optional(),
  processor: vine.string().trim().maxLength(150).optional(),
  storageType: vine.string().trim().maxLength(80).optional(),
  storageCapacityGb: vine.number().min(0).optional(),
  ownershipType: vine.enum(ownershipTypes).optional(),
  status: vine.enum(equipmentStatuses).optional(),
  headquarterId: vine.string().uuid().optional(),
  locationId: vine.string().uuid().optional(),
  currentResponsibleId: vine.string().uuid().optional(),
  secondaryResponsibleId: vine.string().uuid().optional(),
  purchaseDate: vine.date().optional(),
  warrantyUntil: vine.date().optional(),
  ...leaseFields,
  lastMaintenanceAt: vine.date().optional(),
  nextMaintenanceAt: vine.date().optional(),
  notes: vine.string().trim().optional(),
})

export const listEquipmentValidator = vine.create({
  search: vine.string().trim().maxLength(150).optional(),
  status: vine.enum(equipmentStatuses).optional(),
  type: vine.string().trim().maxLength(100).optional(),
  brand: vine.string().trim().maxLength(120).optional(),
  ownershipType: vine.enum(ownershipTypes).optional(),
  headquarterId: vine.string().uuid().optional(),
  locationId: vine.string().uuid().optional(),
  currentResponsibleId: vine.string().uuid().optional(),
  secondaryResponsibleId: vine.string().uuid().optional(),
  warrantyUntilBefore: vine.date().optional(),
  leaseUntilBefore: vine.date().optional(),
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(100).optional(),
  orderBy: vine
    .enum([
      'createdAt',
      'internalCode',
      'serial',
      'type',
      'brand',
      'status',
      'warrantyUntil',
      'leaseUntil',
    ])
    .optional(),
  orderDirection: vine.enum(['asc', 'desc']).optional(),
})

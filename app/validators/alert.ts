import vine from '@vinejs/vine'

export const alertStatuses = ['open', 'acknowledged', 'resolved', 'dismissed'] as const
export const alertSeverities = ['low', 'medium', 'high', 'critical'] as const

export const listAlertValidator = vine.create({
  assignedTo: vine.string().uuid().optional(),
  equipmentId: vine.string().uuid().optional(),
  severity: vine.enum(alertSeverities).optional(),
  status: vine.enum(alertStatuses).optional(),
  type: vine.string().trim().maxLength(80).optional(),
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(100).optional(),
})

export const runAlertChecksValidator = vine.create({
  referenceDate: vine.date().optional(),
})

export const assignAlertValidator = vine.create({
  assignedTo: vine.string().uuid(),
})

export const alertNoteValidator = vine.create({
  note: vine.string().trim().minLength(3).maxLength(1000),
})

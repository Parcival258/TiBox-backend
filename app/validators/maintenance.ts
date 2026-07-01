import vine from '@vinejs/vine'

export const maintenanceTypes = ['preventive', 'corrective'] as const
export const maintenanceStatuses = [
  'scheduled',
  'pending',
  'in_progress',
  'completed',
  'cancelled',
  'rescheduled',
  'overdue',
] as const
export const maintenancePriorities = ['low', 'medium', 'high', 'critical'] as const
export const maintenanceStages = ['reception', 'execution', 'closure'] as const

export const createMaintenanceScheduleValidator = vine.create({
  equipmentId: vine.string().uuid(),
  maintenanceType: vine.enum(maintenanceTypes),
  status: vine.enum(maintenanceStatuses).optional(),
  priority: vine.enum(maintenancePriorities).optional(),
  scheduledFor: vine.date(),
  assignedTechnicianId: vine.string().uuid().optional(),
  frequencyMonths: vine.number().min(1).optional(),
  notes: vine.string().trim().optional(),
})

export const updateMaintenanceScheduleValidator = vine.create({
  equipmentId: vine.string().uuid().optional(),
  maintenanceType: vine.enum(maintenanceTypes).optional(),
  status: vine.enum(maintenanceStatuses).optional(),
  priority: vine.enum(maintenancePriorities).optional(),
  scheduledFor: vine.date().optional(),
  assignedTechnicianId: vine.string().uuid().optional(),
  frequencyMonths: vine.number().min(1).optional(),
  notes: vine.string().trim().optional(),
})

export const rescheduleMaintenanceScheduleValidator = vine.create({
  scheduledFor: vine.date(),
  assignedTechnicianId: vine.string().uuid().optional(),
  priority: vine.enum(maintenancePriorities).optional(),
  notes: vine.string().trim().optional(),
})

export const listMaintenanceScheduleValidator = vine.create({
  equipmentId: vine.string().uuid().optional(),
  assignedTechnicianId: vine.string().uuid().optional(),
  maintenanceType: vine.enum(maintenanceTypes).optional(),
  status: vine.enum(maintenanceStatuses).optional(),
  priority: vine.enum(maintenancePriorities).optional(),
  scheduledFrom: vine.date().optional(),
  scheduledTo: vine.date().optional(),
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(100).optional(),
})

export const createMaintenanceRecordValidator = vine.create({
  equipmentId: vine.string().uuid(),
  maintenanceScheduleId: vine.string().uuid().optional(),
  maintenanceType: vine.enum(maintenanceTypes),
  status: vine.enum(maintenanceStatuses).optional(),
  priority: vine.enum(maintenancePriorities).optional(),
  currentStage: vine.enum(maintenanceStages).optional(),
  scheduledDate: vine.date().optional(),
  receivedAt: vine.date().optional(),
  performedAt: vine.date().optional(),
  closedAt: vine.date().optional(),
  performedBy: vine.string().uuid().optional(),
  description: vine.string().trim().optional(),
  initialEquipmentState: vine.string().trim().optional(),
  receptionObservations: vine.string().trim().optional(),
  diagnosis: vine.string().trim().optional(),
  actionsTaken: vine.string().trim().optional(),
  technicalObservations: vine.string().trim().optional(),
  partsReplaced: vine.string().trim().optional(),
  componentsUsed: vine.string().trim().optional(),
  cost: vine.number().min(0).optional(),
  componentsCost: vine.number().min(0).optional(),
  softwareWork: vine.string().trim().optional(),
  finalEquipmentState: vine.string().trim().optional(),
  receivedByName: vine.string().trim().optional(),
  finalDestination: vine.string().trim().optional(),
  nextMaintenanceAt: vine.date().optional(),
})

export const updateMaintenanceRecordValidator = vine.create({
  equipmentId: vine.string().uuid().optional(),
  maintenanceScheduleId: vine.string().uuid().optional(),
  maintenanceType: vine.enum(maintenanceTypes).optional(),
  status: vine.enum(maintenanceStatuses).optional(),
  priority: vine.enum(maintenancePriorities).optional(),
  currentStage: vine.enum(maintenanceStages).optional(),
  scheduledDate: vine.date().optional(),
  receivedAt: vine.date().optional(),
  performedAt: vine.date().optional(),
  closedAt: vine.date().optional(),
  performedBy: vine.string().uuid().optional(),
  description: vine.string().trim().optional(),
  initialEquipmentState: vine.string().trim().optional(),
  receptionObservations: vine.string().trim().optional(),
  diagnosis: vine.string().trim().optional(),
  actionsTaken: vine.string().trim().optional(),
  technicalObservations: vine.string().trim().optional(),
  partsReplaced: vine.string().trim().optional(),
  componentsUsed: vine.string().trim().optional(),
  cost: vine.number().min(0).optional(),
  componentsCost: vine.number().min(0).optional(),
  softwareWork: vine.string().trim().optional(),
  finalEquipmentState: vine.string().trim().optional(),
  receivedByName: vine.string().trim().optional(),
  finalDestination: vine.string().trim().optional(),
  nextMaintenanceAt: vine.date().optional(),
})

export const closeMaintenanceRecordValidator = vine.create({
  performedAt: vine.date().optional(),
  closedAt: vine.date().optional(),
  performedBy: vine.string().uuid().optional(),
  diagnosis: vine.string().trim().optional(),
  actionsTaken: vine.string().trim().optional(),
  partsReplaced: vine.string().trim().optional(),
  cost: vine.number().min(0).optional(),
  nextMaintenanceAt: vine.date().optional(),
})

export const updateMaintenanceReceptionValidator = vine.create({
  receivedAt: vine.date().optional(),
  initialEquipmentState: vine.string().trim().optional(),
  receptionObservations: vine.string().trim().optional(),
  description: vine.string().trim().optional(),
})

export const updateMaintenanceExecutionValidator = vine.create({
  actionsTaken: vine.string().trim().optional(),
  technicalObservations: vine.string().trim().optional(),
  componentsUsed: vine.string().trim().optional(),
  partsReplaced: vine.string().trim().optional(),
  componentsCost: vine.number().min(0).optional(),
  cost: vine.number().min(0).optional(),
  softwareWork: vine.string().trim().optional(),
  diagnosis: vine.string().trim().optional(),
})

export const updateMaintenanceClosureValidator = vine.create({
  finalEquipmentState: vine.string().trim().optional(),
  receivedByName: vine.string().trim().optional(),
  finalDestination: vine.string().trim().optional(),
  performedAt: vine.date().optional(),
  closedAt: vine.date().optional(),
  performedBy: vine.string().uuid().optional(),
  nextMaintenanceAt: vine.date().optional(),
})

export const listMaintenanceRecordValidator = vine.create({
  equipmentId: vine.string().uuid().optional(),
  maintenanceScheduleId: vine.string().uuid().optional(),
  performedBy: vine.string().uuid().optional(),
  maintenanceType: vine.enum(maintenanceTypes).optional(),
  status: vine.enum(maintenanceStatuses).optional(),
  priority: vine.enum(maintenancePriorities).optional(),
  currentStage: vine.enum(maintenanceStages).optional(),
  performedFrom: vine.date().optional(),
  performedTo: vine.date().optional(),
  scheduledFrom: vine.date().optional(),
  scheduledTo: vine.date().optional(),
  headquarterId: vine.string().uuid().optional(),
  equipmentGroupId: vine.string().uuid().optional(),
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(100).optional(),
})

import { maintenancePriorities } from '#validators/maintenance'
import vine from '@vinejs/vine'

export const failureReportStatuses = ['open', 'in_review', 'resolved', 'closed'] as const

export const createFailureReportValidator = vine.create({
  equipmentId: vine.string().uuid(),
  reportedBy: vine.string().uuid().optional(),
  title: vine.string().trim().minLength(3).maxLength(150),
  description: vine.string().trim().minLength(3),
  status: vine.enum(failureReportStatuses).optional(),
  priority: vine.enum(maintenancePriorities).optional(),
  maintenanceRecordId: vine.string().uuid().optional(),
})

export const updateFailureReportValidator = vine.create({
  equipmentId: vine.string().uuid().optional(),
  reportedBy: vine.string().uuid().optional(),
  title: vine.string().trim().minLength(3).maxLength(150).optional(),
  description: vine.string().trim().minLength(3).optional(),
  status: vine.enum(failureReportStatuses).optional(),
  priority: vine.enum(maintenancePriorities).optional(),
  maintenanceRecordId: vine.string().uuid().optional(),
})

export const closeFailureReportValidator = vine.create({
  status: vine.enum(['resolved', 'closed'] as const).optional(),
  maintenanceRecordId: vine.string().uuid().optional(),
})

export const listFailureReportValidator = vine.create({
  equipmentId: vine.string().uuid().optional(),
  reportedBy: vine.string().uuid().optional(),
  maintenanceRecordId: vine.string().uuid().optional(),
  status: vine.enum(failureReportStatuses).optional(),
  priority: vine.enum(maintenancePriorities).optional(),
  search: vine.string().trim().maxLength(150).optional(),
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(100).optional(),
})

import vine from '@vinejs/vine'
import { maintenanceStages } from '#validators/maintenance'

export const uploadEquipmentAttachmentValidator = vine.create({
  file: vine.file({
    size: '10mb',
    extnames: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx'],
  }),
  stage: vine.enum(maintenanceStages).optional(),
})

export const uploadMaintenanceRecordAttachmentValidator = vine.create({
  file: vine.file({
    size: '10mb',
    extnames: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx'],
  }),
  stage: vine.enum(maintenanceStages),
})

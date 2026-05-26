import vine from '@vinejs/vine'

export const uploadEquipmentAttachmentValidator = vine.create({
  file: vine.file({
    size: '10mb',
    extnames: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx'],
  }),
})

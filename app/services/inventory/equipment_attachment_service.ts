import Attachment from '#models/attachment'
import Equipment from '#models/equipment'
import AuditService, { type AuditContext } from '#services/audit/audit_service'
import app from '@adonisjs/core/services/app'
import type { MultipartFile } from '@adonisjs/bodyparser'
import string from '@adonisjs/core/helpers/string'
import { unlink } from 'node:fs/promises'

type UploadEquipmentAttachmentPayload = {
  audit?: AuditContext
  file: MultipartFile
  uploadedBy?: string | null
}

export class EquipmentAttachmentError extends Error {
  constructor(
    message: string,
    public status = 422
  ) {
    super(message)
  }
}

export default class EquipmentAttachmentService {
  private auditService = new AuditService()

  async list(equipmentId: string) {
    await this.ensureEquipmentExists(equipmentId)

    return Attachment.query()
      .where('entity_type', 'equipment')
      .where('entity_id', equipmentId)
      .preload('uploader')
      .orderBy('created_at', 'desc')
  }

  async upload(equipmentId: string, payload: UploadEquipmentAttachmentPayload) {
    await this.ensureEquipmentExists(equipmentId)

    const fileName = this.buildStoredFileName(payload.file)
    const uploadDirectory = app.tmpPath('uploads', 'equipment', equipmentId)

    await payload.file.move(uploadDirectory, {
      name: fileName,
      overwrite: false,
    })

    if (!payload.file.filePath) {
      throw new EquipmentAttachmentError('Attachment could not be stored')
    }

    const attachment = await Attachment.create({
      entityType: 'equipment',
      entityId: equipmentId,
      fileName: payload.file.clientName,
      filePath: payload.file.filePath,
      mimeType: this.getMimeType(payload.file),
      sizeBytes: payload.file.size,
      uploadedBy: payload.uploadedBy ?? null,
    })

    await this.auditService.record({
      ...payload.audit,
      action: 'equipment_attachment.uploaded',
      entityType: 'attachment',
      entityId: attachment.id,
      newValues: attachment.$attributes,
    })

    return attachment
  }

  async find(equipmentId: string, attachmentId: string) {
    await this.ensureEquipmentExists(equipmentId)

    const attachment = await Attachment.query()
      .where('id', attachmentId)
      .where('entity_type', 'equipment')
      .where('entity_id', equipmentId)
      .preload('uploader')
      .first()

    if (!attachment) {
      throw new EquipmentAttachmentError('Attachment not found', 404)
    }

    return attachment
  }

  async delete(equipmentId: string, attachmentId: string, audit?: AuditContext) {
    const attachment = await this.find(equipmentId, attachmentId)
    const oldValues = { ...attachment.$attributes }

    await attachment.delete()

    try {
      await unlink(attachment.filePath)
    } catch {
      // The DB record is the source of truth; missing files should not block deletion.
    }

    await this.auditService.record({
      ...audit,
      action: 'equipment_attachment.deleted',
      entityType: 'attachment',
      entityId: attachment.id,
      oldValues,
    })

    return attachment
  }

  private async ensureEquipmentExists(equipmentId: string) {
    const equipment = await Equipment.query()
      .where('id', equipmentId)
      .whereNull('deleted_at')
      .first()

    if (!equipment) {
      throw new EquipmentAttachmentError('Equipment not found', 404)
    }
  }

  private buildStoredFileName(file: MultipartFile) {
    const extension = file.extname ? `.${file.extname}` : ''

    return `${string.generateRandom(32)}${extension}`
  }

  private getMimeType(file: MultipartFile) {
    if (!file.type) {
      return null
    }

    return file.subtype ? `${file.type}/${file.subtype}` : file.type
  }
}

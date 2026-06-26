import Attachment from '#models/attachment'
import MaintenanceRecord from '#models/maintenance_record'
import AuditService, { type AuditContext } from '#services/audit/audit_service'
import AttachmentStorageService from '#services/storage/attachment_storage_service'
import { AttachmentStorageError } from '#services/storage/attachment_storage'
import type { MultipartFile } from '@adonisjs/bodyparser'

type UploadMaintenanceRecordAttachmentPayload = {
  audit?: AuditContext
  file: MultipartFile
  stage?: 'reception' | 'execution' | 'closure'
  uploadedBy?: string | null
}

export class MaintenanceRecordAttachmentError extends Error {
  constructor(
    message: string,
    public status = 422
  ) {
    super(message)
  }
}

export default class MaintenanceRecordAttachmentService {
  private auditService = new AuditService()
  private storage = new AttachmentStorageService()

  async list(recordId: string) {
    await this.ensureRecordExists(recordId)

    return Attachment.query()
      .where('entity_type', 'maintenance_record')
      .where('entity_id', recordId)
      .preload('uploader')
      .orderBy('created_at', 'desc')
  }

  async upload(recordId: string, payload: UploadMaintenanceRecordAttachmentPayload) {
    await this.ensureRecordExists(recordId)

    const storageKey = await this.storage.save(payload.file, 'maintenance-records', recordId)
    let attachment: Attachment

    try {
      attachment = await Attachment.create({
        entityType: 'maintenance_record',
        entityId: recordId,
        fileName: payload.file.clientName,
        filePath: storageKey,
        mimeType: this.getMimeType(payload.file),
        maintenanceStage: payload.stage ?? null,
        sizeBytes: payload.file.size,
        uploadedBy: payload.uploadedBy ?? null,
      })
    } catch (error) {
      await this.storage.delete(storageKey)
      throw error
    }

    await this.auditService.record({
      ...payload.audit,
      action: 'maintenance_record_attachment.uploaded',
      entityType: 'attachment',
      entityId: attachment.id,
      newValues: attachment.$attributes,
    })

    return attachment
  }

  async find(recordId: string, attachmentId: string) {
    await this.ensureRecordExists(recordId)

    const attachment = await Attachment.query()
      .where('id', attachmentId)
      .where('entity_type', 'maintenance_record')
      .where('entity_id', recordId)
      .preload('uploader')
      .first()

    if (!attachment) {
      throw new MaintenanceRecordAttachmentError('Attachment not found', 404)
    }

    return attachment
  }

  async delete(recordId: string, attachmentId: string, audit?: AuditContext) {
    const attachment = await this.find(recordId, attachmentId)
    const oldValues = { ...attachment.$attributes }

    await attachment.delete()

    try {
      await this.storage.delete(attachment.filePath)
    } catch {
      // The DB record is the source of truth; missing files should not block deletion.
    }

    await this.auditService.record({
      ...audit,
      action: 'maintenance_record_attachment.deleted',
      entityType: 'attachment',
      entityId: attachment.id,
      oldValues,
    })

    return attachment
  }

  resolvePath(storageKey: string) {
    try {
      return this.storage.resolvePath(storageKey)
    } catch (error) {
      if (error instanceof AttachmentStorageError) {
        throw new MaintenanceRecordAttachmentError('Attachment is unavailable', 404)
      }

      throw error
    }
  }

  private async ensureRecordExists(recordId: string) {
    const record = await MaintenanceRecord.query().where('id', recordId).first()

    if (!record) {
      throw new MaintenanceRecordAttachmentError('Maintenance record not found', 404)
    }
  }

  private getMimeType(file: MultipartFile) {
    if (!file.type) {
      return null
    }

    return file.subtype ? `${file.type}/${file.subtype}` : file.type
  }
}

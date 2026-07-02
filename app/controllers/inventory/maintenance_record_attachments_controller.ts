import MaintenanceRecordAttachmentService, {
  MaintenanceRecordAttachmentError,
} from '#services/inventory/maintenance_record_attachment_service'
import { uploadMaintenanceRecordAttachmentValidator } from '#validators/attachment'
import type { HttpContext } from '@adonisjs/core/http'

export default class MaintenanceRecordAttachmentsController {
  private attachmentService = new MaintenanceRecordAttachmentService()

  async index({ params, response }: HttpContext) {
    try {
      return await this.attachmentService.list(params.record_id)
    } catch (error) {
      return this.handleAttachmentError(error, response)
    }
  }

  async store({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(uploadMaintenanceRecordAttachmentValidator)
    const uploadedBy = auth.isAuthenticated ? auth.getUserOrFail().id : null

    try {
      const attachment = await this.attachmentService.upload(params.record_id, {
        audit: this.auditContext({ auth, request }),
        file: payload.file,
        stage: payload.stage,
        uploadedBy,
      })

      return response.created(attachment)
    } catch (error) {
      return this.handleAttachmentError(error, response)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const attachment = await this.attachmentService.find(params.record_id, params.id)

      return response.attachment(
        this.attachmentService.resolvePath(attachment.filePath),
        attachment.fileName
      )
    } catch (error) {
      return this.handleAttachmentError(error, response)
    }
  }

  async destroy({ auth, params, request, response }: HttpContext) {
    try {
      await this.attachmentService.delete(
        params.record_id,
        params.id,
        this.auditContext({ auth, request })
      )

      return response.noContent()
    } catch (error) {
      return this.handleAttachmentError(error, response)
    }
  }

  private auditContext({ auth, request }: Pick<HttpContext, 'auth' | 'request'>) {
    return {
      userId: auth.isAuthenticated ? auth.getUserOrFail().id : null,
      ipAddress: request.ip(),
      userAgent: request.header('user-agent') ?? null,
    }
  }

  private handleAttachmentError(error: unknown, response: HttpContext['response']) {
    if (error instanceof MaintenanceRecordAttachmentError) {
      return response.status(error.status).send({ message: error.message })
    }

    throw error
  }
}

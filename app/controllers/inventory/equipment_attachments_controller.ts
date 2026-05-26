import EquipmentAttachmentService, {
  EquipmentAttachmentError,
} from '#services/inventory/equipment_attachment_service'
import { uploadEquipmentAttachmentValidator } from '#validators/attachment'
import type { HttpContext } from '@adonisjs/core/http'

export default class EquipmentAttachmentsController {
  private attachmentService = new EquipmentAttachmentService()

  async index({ params, response }: HttpContext) {
    try {
      return await this.attachmentService.list(params.equipment_id)
    } catch (error) {
      return this.handleAttachmentError(error, response)
    }
  }

  async store({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(uploadEquipmentAttachmentValidator)
    const uploadedBy = auth.isAuthenticated ? auth.getUserOrFail().id : null

    try {
      const attachment = await this.attachmentService.upload(params.equipment_id, {
        file: payload.file,
        uploadedBy,
      })

      return response.created(attachment)
    } catch (error) {
      return this.handleAttachmentError(error, response)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const attachment = await this.attachmentService.find(params.equipment_id, params.id)

      return response.attachment(attachment.filePath, attachment.fileName)
    } catch (error) {
      return this.handleAttachmentError(error, response)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      await this.attachmentService.delete(params.equipment_id, params.id)

      return response.noContent()
    } catch (error) {
      return this.handleAttachmentError(error, response)
    }
  }

  private handleAttachmentError(error: unknown, response: HttpContext['response']) {
    if (error instanceof EquipmentAttachmentError) {
      return response.status(error.status).send({ message: error.message })
    }

    throw error
  }
}

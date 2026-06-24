import ChatService from '#services/chat/chat_service'
import {
  createChatMessageValidator,
  createDirectConversationValidator,
  createGroupConversationValidator,
  listChatMessagesValidator,
  markChatReadValidator,
} from '#validators/chat'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChatController {
  private chatService = new ChatService()

  async users({ auth }: HttpContext) {
    return this.chatService.listUsers(auth.getUserOrFail().id)
  }

  async conversations({ auth }: HttpContext) {
    return this.chatService.listConversations(auth.getUserOrFail().id)
  }

  async createDirect({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createDirectConversationValidator)
    const conversation = await this.chatService.createDirectConversation(
      auth.getUserOrFail().id,
      payload.userId
    )

    if (!conversation) {
      return response.badRequest({ message: 'No se pudo crear la conversacion directa' })
    }

    return response.created({ conversation })
  }

  async createGroup({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createGroupConversationValidator)
    const conversation = await this.chatService.createGroupConversation(
      auth.getUserOrFail().id,
      payload
    )

    if (!conversation) {
      return response.badRequest({ message: 'No se pudo crear el grupo' })
    }

    return response.created({ conversation })
  }

  async messages({ auth, params, request, response }: HttpContext) {
    const filters = await request.validateUsing(listChatMessagesValidator)
    const result = await this.chatService.listMessages(
      params.id,
      auth.getUserOrFail().id,
      filters.page,
      filters.perPage
    )

    if (!result) {
      return response.notFound({ message: 'Conversacion no encontrada' })
    }

    return result
  }

  async createMessage({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(createChatMessageValidator)
    const result = await this.chatService.createMessage(
      params.id,
      auth.getUserOrFail().id,
      payload.body
    )

    if (!result) {
      return response.notFound({ message: 'Conversacion no encontrada' })
    }

    return response.created(result)
  }

  async markRead({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(markChatReadValidator)
    const result = await this.chatService.markRead(params.id, auth.getUserOrFail().id, payload)

    if (!result) {
      return response.notFound({ message: 'Conversacion no encontrada' })
    }

    return result
  }

  async clearMessages({ auth, params, response }: HttpContext) {
    const result = await this.chatService.clearMessages(params.id, auth.getUserOrFail().id)

    if (!result) {
      return response.notFound({ message: 'Conversacion no encontrada' })
    }

    return result
  }

  async deleteConversation({ auth, params, response }: HttpContext) {
    const deleted = await this.chatService.deleteConversation(params.id, auth.getUserOrFail().id)

    if (!deleted) {
      return response.notFound({ message: 'Conversacion no encontrada' })
    }

    return response.noContent()
  }
}

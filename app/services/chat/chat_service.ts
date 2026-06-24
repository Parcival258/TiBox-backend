import ChatConversation from '#models/chat_conversation'
import ChatMessage from '#models/chat_message'
import ChatMessageRead from '#models/chat_message_read'
import ChatParticipant from '#models/chat_participant'
import User from '#models/user'
import realtimeService from '#services/realtime/realtime_service'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

type CreateGroupPayload = {
  memberIds: string[]
  name: string
}

type ReadPayload = {
  messageId?: string
}

type MessageDeliveryStatus = 'delivered' | 'read' | 'sent'

export default class ChatService {
  async listUsers(currentUserId: string) {
    const users = await User.query()
      .where('is_active', true)
      .whereNull('deleted_at')
      .whereNot('id', currentUserId)
      .preload('role')
      .orderBy('name', 'asc')

    return {
      users: users.map((user) => this.serializeUser(user)),
    }
  }

  async listConversations(userId: string) {
    const conversations = await ChatConversation.query()
      .whereHas('participants', (participantQuery) => {
        participantQuery.where('user_id', userId)
      })
      .preload('participants', (participantQuery) => {
        participantQuery.preload('user', (userQuery) => userQuery.preload('role'))
      })
      .preload('lastMessage', (messageQuery) => {
        messageQuery.preload('sender')
      })
      .orderByRaw('coalesce(last_message_at, created_at) desc')

    const serialized = await Promise.all(
      conversations.map(async (conversation) => ({
        ...this.serializeConversation(conversation, userId),
        unreadCount: await this.unreadCount(conversation.id, userId),
      }))
    )

    return { conversations: serialized }
  }

  async createDirectConversation(currentUserId: string, targetUserId: string) {
    if (currentUserId === targetUserId) {
      return null
    }

    const targetUser = await this.findActiveUser(targetUserId)
    if (!targetUser) {
      return null
    }

    const existing = await db.rawQuery(
      `
      select c.id
      from chat_conversations c
      join chat_participants p1 on p1.conversation_id = c.id and p1.user_id = ?
      join chat_participants p2 on p2.conversation_id = c.id and p2.user_id = ?
      where c.type = 'direct'
        and (select count(*) from chat_participants p where p.conversation_id = c.id) = 2
      limit 1
      `,
      [currentUserId, targetUserId]
    )

    const existingId = existing.rows[0]?.id as string | undefined
    if (existingId) {
      return this.getConversationForUser(existingId, currentUserId)
    }

    const conversation = await ChatConversation.create({
      createdBy: currentUserId,
      type: 'direct',
    })

    await ChatParticipant.createMany([
      {
        conversationId: conversation.id,
        role: 'owner',
        userId: currentUserId,
      },
      {
        conversationId: conversation.id,
        role: 'member',
        userId: targetUserId,
      },
    ])

    await this.loadConversation(conversation)
    const serialized = {
      ...this.serializeConversation(conversation, currentUserId),
      unreadCount: 0,
    }

    await this.emitConversationUpdated(conversation)

    return serialized
  }

  async createGroupConversation(currentUserId: string, payload: CreateGroupPayload) {
    const memberIds = [...new Set(payload.memberIds)].filter(
      (memberId) => memberId !== currentUserId
    )
    if (memberIds.length < 2) {
      return null
    }

    const activeUsers = await User.query()
      .whereIn('id', memberIds)
      .where('is_active', true)
      .whereNull('deleted_at')

    if (activeUsers.length !== memberIds.length) {
      return null
    }

    const conversation = await ChatConversation.create({
      createdBy: currentUserId,
      name: payload.name,
      type: 'group',
    })

    await ChatParticipant.createMany([
      {
        conversationId: conversation.id,
        role: 'owner',
        userId: currentUserId,
      },
      ...memberIds.map((userId) => ({
        conversationId: conversation.id,
        role: 'member' as const,
        userId,
      })),
    ])

    await this.loadConversation(conversation)
    await this.emitConversationUpdated(conversation)

    return {
      ...this.serializeConversation(conversation, currentUserId),
      unreadCount: 0,
    }
  }

  async listMessages(conversationId: string, userId: string, page = 1, perPage = 40) {
    if (!(await this.isParticipant(conversationId, userId))) {
      return null
    }

    const messages = await ChatMessage.query()
      .where('conversation_id', conversationId)
      .whereNull('deleted_at')
      .preload('sender')
      .preload('reads')
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)

    const serializedMessages = messages
      .all()
      .map((message) => this.serializeMessage(message, userId))
      .reverse()

    return {
      meta: messages.getMeta(),
      messages: serializedMessages,
    }
  }

  async createMessage(conversationId: string, userId: string, body: string) {
    const conversation = await ChatConversation.query()
      .where('id', conversationId)
      .preload('participants')
      .first()

    if (
      !conversation ||
      !conversation.participants.some((participant) => participant.userId === userId)
    ) {
      return null
    }

    const now = DateTime.local()
    const message = await ChatMessage.create({
      body,
      conversationId,
      senderId: userId,
    })

    await ChatMessageRead.createMany(
      conversation.participants.map((participant) => ({
        deliveredAt: now,
        messageId: message.id,
        readAt: participant.userId === userId ? now : null,
        userId: participant.userId,
      }))
    )

    conversation.lastMessageId = message.id
    conversation.lastMessageAt = message.createdAt
    await conversation.save()

    const senderParticipant = conversation.participants.find(
      (participant) => participant.userId === userId
    )
    if (senderParticipant) {
      senderParticipant.lastReadAt = now
      await senderParticipant.save()
    }

    await message.load('sender')
    await message.load('reads')
    await this.loadConversation(conversation)

    await Promise.all(
      conversation.participants.map(async (participant) => {
        realtimeService.emitChatMessageCreated(
          {
            conversation: {
              ...this.serializeConversation(conversation, participant.userId),
              unreadCount: await this.unreadCount(conversation.id, participant.userId),
            },
            message: this.serializeMessage(message, participant.userId),
          },
          [participant.userId]
        )
      })
    )

    return {
      conversation: {
        ...this.serializeConversation(conversation, userId),
        unreadCount: await this.unreadCount(conversation.id, userId),
      },
      message: this.serializeMessage(message, userId),
    }
  }

  async markRead(conversationId: string, userId: string, payload: ReadPayload) {
    const participant = await ChatParticipant.query()
      .where('conversation_id', conversationId)
      .where('user_id', userId)
      .first()

    if (!participant) {
      return null
    }

    const latestMessage = payload.messageId
      ? await ChatMessage.query()
          .where('id', payload.messageId)
          .where('conversation_id', conversationId)
          .first()
      : await ChatMessage.query()
          .where('conversation_id', conversationId)
          .whereNull('deleted_at')
          .orderBy('created_at', 'desc')
          .first()

    if (!latestMessage) {
      return { readAt: null, unreadCount: 0 }
    }

    const now = DateTime.local()
    await ChatMessageRead.query()
      .where('user_id', userId)
      .whereNull('read_at')
      .whereIn(
        'message_id',
        ChatMessage.query()
          .select('id')
          .where('conversation_id', conversationId)
          .where('created_at', '<=', latestMessage.createdAt.toSQL()!)
      )
      .update({ readAt: now })

    participant.lastReadAt = now
    await participant.save()

    const participantIds = await this.participantIds(conversationId)
    const result = {
      conversationId,
      readAt: now.toISO(),
      unreadCount: await this.unreadCount(conversationId, userId),
      userId,
    }

    realtimeService.emitChatMessagesRead(result, participantIds)

    return result
  }

  async clearMessages(conversationId: string, userId: string) {
    if (!(await this.isParticipant(conversationId, userId))) {
      return null
    }

    const conversation = await ChatConversation.find(conversationId)
    if (!conversation) {
      return null
    }

    const now = DateTime.local()
    await ChatMessage.query()
      .where('conversation_id', conversationId)
      .whereNull('deleted_at')
      .update({ deletedAt: now })

    conversation.lastMessageId = null
    conversation.lastMessageAt = null
    await conversation.save()
    await this.loadConversation(conversation)
    await this.emitConversationUpdated(conversation)

    return {
      conversation: {
        ...this.serializeConversation(conversation, userId),
        unreadCount: await this.unreadCount(conversation.id, userId),
      },
    }
  }

  async deleteConversation(conversationId: string, userId: string) {
    const conversation = await ChatConversation.query()
      .where('id', conversationId)
      .preload('participants')
      .first()

    if (
      !conversation ||
      !conversation.participants.some((participant) => participant.userId === userId)
    ) {
      return false
    }

    const participantIds = conversation.participants.map((participant) => participant.userId)
    await conversation.delete()
    realtimeService.emitChatConversationUpdated({ deleted: true, id: conversationId }, participantIds)

    return true
  }

  private async getConversationForUser(conversationId: string, userId: string) {
    const conversation = await ChatConversation.findOrFail(conversationId)
    await this.loadConversation(conversation)

    return {
      ...this.serializeConversation(conversation, userId),
      unreadCount: await this.unreadCount(conversation.id, userId),
    }
  }

  private async loadConversation(conversation: ChatConversation) {
    await conversation.load('participants', (participantQuery) => {
      participantQuery.preload('user', (userQuery) => userQuery.preload('role'))
    })
    if (conversation.lastMessageId) {
      await conversation.load('lastMessage', (messageQuery) => {
        messageQuery.preload('sender')
      })
    }
  }

  private async findActiveUser(userId: string) {
    return User.query().where('id', userId).where('is_active', true).whereNull('deleted_at').first()
  }

  private async isParticipant(conversationId: string, userId: string) {
    const participant = await ChatParticipant.query()
      .where('conversation_id', conversationId)
      .where('user_id', userId)
      .first()

    return Boolean(participant)
  }

  private async participantIds(conversationId: string) {
    const participants = await ChatParticipant.query().where('conversation_id', conversationId)
    return participants.map((participant) => participant.userId)
  }

  private async emitConversationUpdated(conversation: ChatConversation) {
    await Promise.all(
      conversation.participants.map(async (participant) => {
        realtimeService.emitChatConversationUpdated(
          {
            ...this.serializeConversation(conversation, participant.userId),
            unreadCount: await this.unreadCount(conversation.id, participant.userId),
          },
          [participant.userId]
        )
      })
    )
  }

  private async unreadCount(conversationId: string, userId: string) {
    const result = await db.rawQuery(
      `
      select count(*)::int as total
      from chat_messages m
      left join chat_message_reads r on r.message_id = m.id and r.user_id = ?
      where m.conversation_id = ?
        and m.sender_id <> ?
        and m.deleted_at is null
        and r.read_at is null
      `,
      [userId, conversationId, userId]
    )

    return Number(result.rows[0]?.total ?? 0)
  }

  private serializeConversation(conversation: ChatConversation, currentUserId: string) {
    const participants =
      conversation.participants?.map((participant) => ({
        id: participant.id,
        joinedAt: participant.joinedAt?.toISO(),
        lastReadAt: participant.lastReadAt?.toISO() ?? null,
        role: participant.role,
        user: participant.user ? this.serializeUser(participant.user) : null,
        userId: participant.userId,
      })) ?? []
    const directPeer = participants.find((participant) => participant.userId !== currentUserId)

    return {
      id: conversation.id,
      createdAt: conversation.createdAt.toISO(),
      displayName:
        conversation.type === 'direct'
          ? (directPeer?.user?.name ?? 'Conversacion directa')
          : (conversation.name ?? 'Grupo sin nombre'),
      lastMessage: conversation.lastMessage
        ? this.serializeMessage(conversation.lastMessage, currentUserId)
        : null,
      lastMessageAt: conversation.lastMessageAt?.toISO() ?? null,
      name: conversation.name,
      participants,
      type: conversation.type,
      updatedAt: conversation.updatedAt.toISO(),
    }
  }

  private serializeMessage(message: ChatMessage, currentUserId: string) {
    return {
      id: message.id,
      body: message.body,
      conversationId: message.conversationId,
      createdAt: message.createdAt.toISO(),
      deliveryStatus: this.deliveryStatus(message, currentUserId),
      reads:
        message.reads?.map((read) => ({
          deliveredAt: read.deliveredAt?.toISO() ?? null,
          readAt: read.readAt?.toISO() ?? null,
          userId: read.userId,
        })) ?? [],
      sender: message.sender ? this.serializeUser(message.sender) : null,
      senderId: message.senderId,
      updatedAt: message.updatedAt.toISO(),
    }
  }

  private deliveryStatus(message: ChatMessage, currentUserId: string): MessageDeliveryStatus {
    if (message.senderId !== currentUserId) {
      return 'read'
    }

    const recipientReads = message.reads?.filter((read) => read.userId !== currentUserId) ?? []
    if (recipientReads.length === 0) {
      return 'sent'
    }

    if (recipientReads.every((read) => read.readAt)) {
      return 'read'
    }

    if (recipientReads.every((read) => read.deliveredAt)) {
      return 'delivered'
    }

    return 'sent'
  }

  private serializeUser(user: User) {
    return {
      id: user.id,
      department: user.department,
      email: user.email,
      initials: user.initials,
      isActive: user.isActive,
      jobTitle: user.jobTitle,
      name: user.name,
      role: user.role
        ? {
            id: user.role.id,
            name: user.role.name,
            slug: user.role.slug,
          }
        : null,
    }
  }
}

import ChatMessage from '#models/chat_message'
import ChatParticipant from '#models/chat_participant'
import User from '#models/user'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export type ChatConversationType = 'direct' | 'group'

export default class ChatConversation extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare type: ChatConversationType

  @column()
  declare name: string | null

  @column()
  declare createdBy: string | null

  @column()
  declare lastMessageId: string | null

  @column.dateTime()
  declare lastMessageAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare creator: BelongsTo<typeof User>

  @belongsTo(() => ChatMessage, {
    foreignKey: 'lastMessageId',
  })
  declare lastMessage: BelongsTo<typeof ChatMessage>

  @hasMany(() => ChatParticipant, {
    foreignKey: 'conversationId',
  })
  declare participants: HasMany<typeof ChatParticipant>

  @hasMany(() => ChatMessage, {
    foreignKey: 'conversationId',
  })
  declare messages: HasMany<typeof ChatMessage>
}

import ChatConversation from '#models/chat_conversation'
import ChatMessageRead from '#models/chat_message_read'
import User from '#models/user'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class ChatMessage extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare conversationId: string

  @column()
  declare senderId: string | null

  @column()
  declare body: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => ChatConversation, {
    foreignKey: 'conversationId',
  })
  declare conversation: BelongsTo<typeof ChatConversation>

  @belongsTo(() => User, {
    foreignKey: 'senderId',
  })
  declare sender: BelongsTo<typeof User>

  @hasMany(() => ChatMessageRead, {
    foreignKey: 'messageId',
  })
  declare reads: HasMany<typeof ChatMessageRead>
}

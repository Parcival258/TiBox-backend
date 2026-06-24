import ChatConversation from '#models/chat_conversation'
import User from '#models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class ChatParticipant extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare conversationId: string

  @column()
  declare userId: string

  @column()
  declare role: 'owner' | 'member'

  @column.dateTime()
  declare joinedAt: DateTime

  @column.dateTime()
  declare lastReadAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ChatConversation, {
    foreignKey: 'conversationId',
  })
  declare conversation: BelongsTo<typeof ChatConversation>

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>
}

import ChatMessage from '#models/chat_message'
import User from '#models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class ChatMessageRead extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare messageId: string

  @column()
  declare userId: string

  @column.dateTime()
  declare deliveredAt: DateTime | null

  @column.dateTime()
  declare readAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ChatMessage, {
    foreignKey: 'messageId',
  })
  declare message: BelongsTo<typeof ChatMessage>

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>
}

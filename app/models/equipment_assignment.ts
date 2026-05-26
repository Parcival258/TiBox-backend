import Equipment from '#models/equipment'
import User from '#models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class EquipmentAssignment extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare equipmentId: string

  @column()
  declare userId: string

  @column()
  declare assignedBy: string | null

  @column.dateTime({ autoCreate: true })
  declare assignedAt: DateTime

  @column.dateTime()
  declare returnedAt: DateTime | null

  @column()
  declare notes: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Equipment)
  declare equipment: BelongsTo<typeof Equipment>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'assignedBy',
  })
  declare assigner: BelongsTo<typeof User>
}

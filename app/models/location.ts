import Equipment from '#models/equipment'
import Headquarter from '#models/headquarter'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Location extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare headquarterId: string

  @column()
  declare floor: string | null

  @column()
  declare area: string | null

  @column()
  declare office: string | null

  @column()
  declare description: string | null

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Headquarter)
  declare headquarter: BelongsTo<typeof Headquarter>

  @hasMany(() => Equipment)
  declare equipment: HasMany<typeof Equipment>
}

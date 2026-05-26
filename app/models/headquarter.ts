import Equipment from '#models/equipment'
import Location from '#models/location'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Headquarter extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare city: string | null

  @column()
  declare address: string | null

  @column()
  declare description: string | null

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Location)
  declare locations: HasMany<typeof Location>

  @hasMany(() => Equipment)
  declare equipment: HasMany<typeof Equipment>
}

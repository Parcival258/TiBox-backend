import Equipment from '#models/equipment'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class EquipmentGroup extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare createdBy: string | null

  @column()
  declare updatedBy: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Equipment, {
    localKey: 'id',
    pivotForeignKey: 'equipment_group_id',
    pivotRelatedForeignKey: 'equipment_id',
    relatedKey: 'id',
    pivotTable: 'equipment_group_items',
  })
  declare equipment: ManyToMany<typeof Equipment>
}

import Equipment from '#models/equipment'
import MaintenanceRecord from '#models/maintenance_record'
import type { MaintenancePriority } from '#models/maintenance_schedule'
import User from '#models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class FailureReport extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare equipmentId: string

  @column()
  declare reportedBy: string | null

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare status: string

  @column()
  declare priority: MaintenancePriority

  @column()
  declare maintenanceRecordId: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare closedAt: DateTime | null

  @belongsTo(() => Equipment)
  declare equipment: BelongsTo<typeof Equipment>

  @belongsTo(() => User, {
    foreignKey: 'reportedBy',
  })
  declare reporter: BelongsTo<typeof User>

  @belongsTo(() => MaintenanceRecord)
  declare maintenanceRecord: BelongsTo<typeof MaintenanceRecord>
}

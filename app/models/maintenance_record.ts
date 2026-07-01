import Equipment from '#models/equipment'
import MaintenanceSchedule, {
  type MaintenancePriority,
  type MaintenanceStatus,
  type MaintenanceType,
} from '#models/maintenance_schedule'
import User from '#models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class MaintenanceRecord extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare equipmentId: string

  @column()
  declare maintenanceScheduleId: string | null

  @column()
  declare maintenanceType: MaintenanceType

  @column()
  declare status: MaintenanceStatus

  @column()
  declare priority: MaintenancePriority

  @column()
  declare currentStage: 'reception' | 'execution' | 'closure' | null

  @column.date()
  declare scheduledDate: DateTime | null

  @column.dateTime()
  declare receivedAt: DateTime | null

  @column.dateTime()
  declare performedAt: DateTime | null

  @column.dateTime()
  declare closedAt: DateTime | null

  @column()
  declare performedBy: string | null

  @column()
  declare description: string | null

  @column()
  declare initialEquipmentState: string | null

  @column()
  declare receptionObservations: string | null

  @column()
  declare diagnosis: string | null

  @column()
  declare actionsTaken: string | null

  @column()
  declare technicalObservations: string | null

  @column()
  declare partsReplaced: string | null

  @column()
  declare componentsUsed: string | null

  @column()
  declare cost: string | null

  @column()
  declare componentsCost: string | null

  @column()
  declare softwareWork: string | null

  @column()
  declare finalEquipmentState: string | null

  @column()
  declare receivedByName: string | null

  @column()
  declare finalDestination: string | null

  @column.date()
  declare nextMaintenanceAt: DateTime | null

  @column()
  declare createdBy: string | null

  @column()
  declare updatedBy: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Equipment)
  declare equipment: BelongsTo<typeof Equipment>

  @belongsTo(() => MaintenanceSchedule)
  declare maintenanceSchedule: BelongsTo<typeof MaintenanceSchedule>

  @belongsTo(() => User, {
    foreignKey: 'performedBy',
  })
  declare performer: BelongsTo<typeof User>
}

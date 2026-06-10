import EquipmentAssignment from '#models/equipment_assignment'
import EquipmentLoan from '#models/equipment_loan'
import Headquarter from '#models/headquarter'
import Location from '#models/location'
import MaintenanceRecord from '#models/maintenance_record'
import MaintenanceSchedule from '#models/maintenance_schedule'
import User from '#models/user'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export type OwnershipType = 'owned' | 'leased'
export type EquipmentStatus =
  | 'active'
  | 'inactive'
  | 'in_maintenance'
  | 'damaged'
  | 'retired'
  | 'lost'

export default class Equipment extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare internalCode: string

  @column()
  declare assetTag: string | null

  @column()
  declare serial: string

  @column()
  declare type: string

  @column()
  declare brand: string | null

  @column()
  declare model: string | null

  @column()
  declare ipAddresses: string | null

  @column()
  declare macAddress: string | null

  @column()
  declare processor: string | null

  @column()
  declare storageType: string | null

  @column()
  declare storageCapacityGb: number | null

  @column()
  declare ownershipType: OwnershipType

  @column()
  declare status: EquipmentStatus

  @column()
  declare headquarterId: string | null

  @column()
  declare locationId: string | null

  @column()
  declare currentResponsibleId: string | null

  @column()
  declare secondaryResponsibleId: string | null

  @column.date()
  declare purchaseDate: DateTime | null

  @column.date()
  declare warrantyUntil: DateTime | null

  @column()
  declare leaseProvider: string | null

  @column()
  declare leaseContractNumber: string | null

  @column.date()
  declare leaseUntil: DateTime | null

  @column.date()
  declare lastMaintenanceAt: DateTime | null

  @column.date()
  declare nextMaintenanceAt: DateTime | null

  @column()
  declare notes: string | null

  @column()
  declare createdBy: string | null

  @column()
  declare updatedBy: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => Headquarter)
  declare headquarter: BelongsTo<typeof Headquarter>

  @belongsTo(() => Location)
  declare location: BelongsTo<typeof Location>

  @belongsTo(() => User, {
    foreignKey: 'currentResponsibleId',
  })
  declare currentResponsible: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'secondaryResponsibleId',
  })
  declare secondaryResponsible: BelongsTo<typeof User>

  @hasMany(() => EquipmentAssignment)
  declare assignments: HasMany<typeof EquipmentAssignment>

  @hasMany(() => EquipmentLoan)
  declare loans: HasMany<typeof EquipmentLoan>

  @hasMany(() => MaintenanceSchedule)
  declare maintenanceSchedules: HasMany<typeof MaintenanceSchedule>

  @hasMany(() => MaintenanceRecord)
  declare maintenanceRecords: HasMany<typeof MaintenanceRecord>
}

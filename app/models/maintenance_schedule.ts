import Equipment from '#models/equipment'
import User from '#models/user'
import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export type MaintenanceType = 'preventive' | 'corrective'
export type MaintenanceStatus =
  | 'scheduled'
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'rescheduled'
  | 'overdue'
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'critical'

const maintenanceTypeLabels: Record<MaintenanceType, string> = {
  corrective: 'Correctivo',
  preventive: 'Preventivo',
}

const maintenanceStatusLabels: Record<MaintenanceStatus, string> = {
  cancelled: 'Cancelado',
  completed: 'Finalizado',
  in_progress: 'En proceso',
  overdue: 'Vencido',
  pending: 'Pendiente',
  rescheduled: 'Reprogramado',
  scheduled: 'Programado',
}

const maintenancePriorityLabels: Record<MaintenancePriority, string> = {
  critical: 'Critica',
  high: 'Alta',
  low: 'Baja',
  medium: 'Media',
}

export default class MaintenanceSchedule extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare equipmentId: string

  @column()
  declare maintenanceType: MaintenanceType

  @column()
  declare status: MaintenanceStatus

  @column()
  declare priority: MaintenancePriority

  @column.date()
  declare scheduledFor: DateTime

  @column()
  declare assignedTechnicianId: string | null

  @column()
  declare frequencyMonths: number | null

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

  @computed()
  get maintenanceTypeLabel() {
    return maintenanceTypeLabels[this.maintenanceType]
  }

  @computed()
  get statusLabel() {
    return maintenanceStatusLabels[this.status]
  }

  @computed()
  get priorityLabel() {
    return maintenancePriorityLabels[this.priority]
  }

  @belongsTo(() => Equipment)
  declare equipment: BelongsTo<typeof Equipment>

  @belongsTo(() => User, {
    foreignKey: 'assignedTechnicianId',
  })
  declare assignedTechnician: BelongsTo<typeof User>
}

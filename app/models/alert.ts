import Equipment from '#models/equipment'
import User from '#models/user'
import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export type AlertStatus = 'open' | 'acknowledged' | 'resolved' | 'dismissed'
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical'

const statusLabels: Record<AlertStatus, string> = {
  acknowledged: 'Reconocida',
  dismissed: 'Quitada',
  open: 'Abierta',
  resolved: 'Resuelta',
}

const severityLabels: Record<AlertSeverity, string> = {
  critical: 'Critica',
  high: 'Alta',
  low: 'Baja',
  medium: 'Media',
}

export default class Alert extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare alertKey: string

  @column()
  declare type: string

  @column()
  declare severity: AlertSeverity

  @column()
  declare status: AlertStatus

  @column()
  declare title: string

  @column()
  declare message: string

  @column()
  declare entityType: string

  @column()
  declare entityId: string

  @column()
  declare equipmentId: string | null

  @column()
  declare assignedTo: string | null

  @column({
    consume: (value) => (typeof value === 'string' ? JSON.parse(value) : value),
    prepare: (value) => JSON.stringify(value ?? ['internal']),
  })
  declare channels: string[]

  @column({
    consume: (value) => (typeof value === 'string' ? JSON.parse(value) : value),
    prepare: (value) => (value ? JSON.stringify(value) : null),
  })
  declare metadata: Record<string, unknown> | null

  @column.dateTime()
  declare triggeredAt: DateTime

  @column.dateTime()
  declare dueAt: DateTime | null

  @column.dateTime()
  declare acknowledgedAt: DateTime | null

  @column()
  declare acknowledgedBy: string | null

  @column.dateTime()
  declare resolvedAt: DateTime | null

  @column()
  declare resolvedBy: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @computed()
  get statusLabel() {
    return statusLabels[this.status]
  }

  @computed()
  get severityLabel() {
    return severityLabels[this.severity]
  }

  @belongsTo(() => Equipment)
  declare equipment: BelongsTo<typeof Equipment>

  @belongsTo(() => User, {
    foreignKey: 'assignedTo',
  })
  declare assignee: BelongsTo<typeof User>
}

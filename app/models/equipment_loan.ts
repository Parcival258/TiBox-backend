import Equipment from '#models/equipment'
import User from '#models/user'
import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export type EquipmentLoanStatus =
  | 'requested'
  | 'active'
  | 'returned'
  | 'overdue'
  | 'cancelled'
  | 'rejected'

const statusLabels: Record<EquipmentLoanStatus, string> = {
  active: 'Activo',
  cancelled: 'Cancelado',
  overdue: 'Vencido',
  rejected: 'Rechazado',
  requested: 'Solicitado',
  returned: 'Devuelto',
}

export default class EquipmentLoan extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare equipmentId: string | null

  @column()
  declare userId: string | null

  @column()
  declare borrowerName: string | null

  @column.dateTime()
  declare requestedAt: DateTime

  @column.dateTime()
  declare loanedAt: DateTime | null

  @column()
  declare requestedItem: string

  @column()
  declare requestMode: string | null

  @column()
  declare signatureImage: string | null

  @column.date()
  declare estimatedReturnAt: DateTime

  @column()
  declare receivedSignatureImage: string | null

  @column()
  declare notes: string | null

  @column()
  declare status: EquipmentLoanStatus

  @column()
  declare createdBy: string | null

  @column.dateTime()
  declare returnedAt: DateTime | null

  @column()
  declare returnedBy: string | null

  @column()
  declare reviewedBy: string | null

  @column.dateTime()
  declare reviewedAt: DateTime | null

  @column()
  declare rejectionReason: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @computed()
  get borrowerLabel() {
    return this.user?.name ?? this.borrowerName ?? 'Sin solicitante'
  }

  @computed()
  get statusLabel() {
    return statusLabels[this.status]
  }

  @belongsTo(() => Equipment)
  declare equipment: BelongsTo<typeof Equipment>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare creator: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'returnedBy',
  })
  declare returner: BelongsTo<typeof User>
}

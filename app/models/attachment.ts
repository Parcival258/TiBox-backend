import User from '#models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export type AttachmentEntityType = 'equipment' | 'maintenance_record' | 'equipment_assignment'
export type MaintenanceAttachmentStage = 'reception' | 'execution' | 'closure'

export default class Attachment extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare entityType: AttachmentEntityType

  @column()
  declare entityId: string

  @column()
  declare fileName: string

  @column({ serializeAs: null })
  declare filePath: string

  @column()
  declare mimeType: string | null

  @column()
  declare sizeBytes: number | null

  @column()
  declare uploadedBy: string | null

  @column()
  declare maintenanceStage: MaintenanceAttachmentStage | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'uploadedBy',
  })
  declare uploader: BelongsTo<typeof User>
}

import Equipment from '#models/equipment'
import Role from '#models/role'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

class UserModel extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare roleId: string | null

  @column()
  declare name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare phone: string | null

  @column()
  declare jobTitle: string | null

  @column()
  declare department: string | null

  @column()
  declare isActive: boolean

  @column.dateTime()
  declare lastLoginAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @hasMany(() => Equipment, {
    foreignKey: 'currentResponsibleId',
  })
  declare assignedEquipment: HasMany<typeof Equipment>

  @hasMany(() => Equipment, {
    foreignKey: 'secondaryResponsibleId',
  })
  declare secondaryAssignedEquipment: HasMany<typeof Equipment>

  get fullName() {
    return this.name
  }

  get initials() {
    const [first, last] = this.name ? this.name.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }
}

export default class User extends compose(UserModel, withAuthFinder(hash)) {}

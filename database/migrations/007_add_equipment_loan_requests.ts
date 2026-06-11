import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('equipment_loans', (table) => {
      table.timestamp('loaned_at').nullable().alter()
      table.uuid('reviewed_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.timestamp('reviewed_at').nullable()
      table.text('rejection_reason').nullable()
    })

    this.defer((db) =>
      db.rawQuery(`
        create unique index if not exists uq_pending_equipment_loan_request
        on equipment_loans(equipment_id, user_id)
        where status = 'requested';
      `)
    )
  }

  async down() {
    await this.db.rawQuery('drop index if exists uq_pending_equipment_loan_request')
    this.schema.alterTable('equipment_loans', (table) => {
      table.dropColumn('rejection_reason')
      table.dropColumn('reviewed_at')
      table.dropColumn('reviewed_by')
      table.timestamp('loaned_at').notNullable().alter()
    })
  }
}

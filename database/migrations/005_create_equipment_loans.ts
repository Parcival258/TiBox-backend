import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    const uuidDefault = this.raw('uuid_generate_v4()')

    this.schema.createTable('equipment_loans', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table
        .uuid('equipment_id')
        .notNullable()
        .references('id')
        .inTable('equipment')
        .onDelete('CASCADE')
      table.uuid('user_id').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.string('borrower_name', 150).nullable()
      table.timestamp('requested_at').notNullable().defaultTo(this.now())
      table.timestamp('loaned_at').notNullable().defaultTo(this.now())
      table.text('requested_item').notNullable()
      table.string('request_mode', 80).nullable()
      table.text('signature_image').nullable()
      table.date('estimated_return_at').notNullable()
      table.text('received_signature_image').nullable()
      table.text('notes').nullable()
      table.string('status', 30).notNullable().defaultTo('active')
      table.uuid('created_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.timestamp('returned_at').nullable()
      table.uuid('returned_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())

      table.check(
        '(user_id is not null or borrower_name is not null)',
        [],
        'chk_equipment_loans_borrower'
      )
    })

    this.defer((db) =>
      db.rawQuery(`
        create unique index if not exists uq_active_equipment_loan on equipment_loans(equipment_id) where returned_at is null and status = 'active';
        create index if not exists idx_equipment_loans_equipment_id on equipment_loans(equipment_id);
        create index if not exists idx_equipment_loans_user_id on equipment_loans(user_id);
        create index if not exists idx_equipment_loans_status on equipment_loans(status);
        create index if not exists idx_equipment_loans_estimated_return_at on equipment_loans(estimated_return_at);
      `)
    )
  }

  async down() {
    this.schema.dropTable('equipment_loans')
  }
}

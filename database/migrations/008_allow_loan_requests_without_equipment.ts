import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    await this.db.rawQuery('drop index if exists uq_pending_equipment_loan_request')
    this.schema.alterTable('equipment_loans', (table) => {
      table.uuid('equipment_id').nullable().alter()
    })
    this.defer((db) =>
      db.rawQuery(`
        create unique index if not exists uq_pending_user_loan_request
        on equipment_loans(user_id)
        where status = 'requested';
      `)
    )
  }

  async down() {
    await this.db.rawQuery('drop index if exists uq_pending_user_loan_request')
    await this.db.rawQuery(`
      delete from equipment_loans where equipment_id is null;
      alter table equipment_loans alter column equipment_id set not null;
      create unique index if not exists uq_pending_equipment_loan_request
      on equipment_loans(equipment_id, user_id)
      where status = 'requested';
    `)
  }
}

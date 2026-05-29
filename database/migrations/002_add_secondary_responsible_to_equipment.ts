import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('equipment', (table) => {
      table
        .uuid('secondary_responsible_id')
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
    })

    this.defer((db) =>
      db.rawQuery(`
        create index if not exists idx_equipment_secondary_responsible_id
          on equipment(secondary_responsible_id);
      `)
    )
  }

  async down() {
    await this.db.rawQuery('drop index if exists idx_equipment_secondary_responsible_id')

    this.schema.alterTable('equipment', (table) => {
      table.dropColumn('secondary_responsible_id')
    })
  }
}

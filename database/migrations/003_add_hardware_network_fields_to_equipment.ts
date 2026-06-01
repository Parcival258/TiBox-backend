import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('equipment', (table) => {
      table.text('ip_addresses').nullable()
      table.string('mac_address', 80).nullable()
      table.string('processor', 150).nullable()
      table.string('storage_type', 80).nullable()
      table.integer('storage_capacity_gb').nullable()
    })

    this.defer((db) =>
      db.rawQuery(`
        create index if not exists idx_equipment_mac_address on equipment(mac_address);
        create index if not exists idx_equipment_processor on equipment(processor);
      `)
    )
  }

  async down() {
    await this.db.rawQuery(`
      drop index if exists idx_equipment_processor;
      drop index if exists idx_equipment_mac_address;
    `)

    this.schema.alterTable('equipment', (table) => {
      table.dropColumn('storage_capacity_gb')
      table.dropColumn('storage_type')
      table.dropColumn('processor')
      table.dropColumn('mac_address')
      table.dropColumn('ip_addresses')
    })
  }
}

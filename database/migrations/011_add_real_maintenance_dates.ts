import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'maintenance_records'

  async up() {
    await this.db.rawQuery(`
      alter table maintenance_records
        add column if not exists received_at timestamp,
        add column if not exists closed_at timestamp
    `)

    await this.db.rawQuery(
      'create index if not exists idx_maintenance_records_received_at on maintenance_records(received_at)'
    )
    await this.db.rawQuery(
      'create index if not exists idx_maintenance_records_closed_at on maintenance_records(closed_at)'
    )
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('received_at')
      table.dropColumn('closed_at')
    })
  }
}

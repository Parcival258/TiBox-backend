import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    const uuidDefault = this.raw('uuid_generate_v4()')

    this.schema.createTable('alerts', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table.string('alert_key', 220).notNullable().unique()
      table.string('type', 80).notNullable()
      table.string('severity', 30).notNullable().defaultTo('medium')
      table.string('status', 30).notNullable().defaultTo('open')
      table.string('title', 180).notNullable()
      table.text('message').notNullable()
      table.string('entity_type', 80).notNullable()
      table.uuid('entity_id').notNullable()
      table
        .uuid('equipment_id')
        .nullable()
        .references('id')
        .inTable('equipment')
        .onDelete('CASCADE')
      table.uuid('assigned_to').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.jsonb('channels').notNullable().defaultTo('["internal"]')
      table.jsonb('metadata').nullable()
      table.timestamp('triggered_at').notNullable().defaultTo(this.now())
      table.timestamp('due_at').nullable()
      table.timestamp('acknowledged_at').nullable()
      table
        .uuid('acknowledged_by')
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
      table.timestamp('resolved_at').nullable()
      table.uuid('resolved_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
    })

    this.defer((db) =>
      db.rawQuery(`
        create index if not exists idx_alerts_status on alerts(status);
        create index if not exists idx_alerts_type on alerts(type);
        create index if not exists idx_alerts_severity on alerts(severity);
        create index if not exists idx_alerts_equipment_id on alerts(equipment_id);
        create index if not exists idx_alerts_assigned_to on alerts(assigned_to);
        create index if not exists idx_alerts_due_at on alerts(due_at);
      `)
    )
  }

  async down() {
    this.schema.dropTable('alerts')
  }
}

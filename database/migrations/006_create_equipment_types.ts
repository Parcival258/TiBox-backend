import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    const uuidDefault = this.raw('uuid_generate_v4()')

    this.schema.createTable('equipment_types', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table.string('name', 100).notNullable().unique()
      table.text('description').nullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
    })

    this.defer((db) =>
      db.rawQuery(`
        insert into equipment_types (name)
        select distinct trim(type)
        from equipment
        where deleted_at is null and type is not null and trim(type) <> ''
        on conflict (name) do nothing;
      `)
    )
  }

  async down() {
    this.schema.dropTable('equipment_types')
  }
}

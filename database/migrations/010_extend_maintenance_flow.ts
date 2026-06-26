import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'maintenance_records'

  async up() {
    await this.db.rawQuery(`
      alter table maintenance_records
        add column if not exists current_stage varchar(30),
        add column if not exists initial_equipment_state text,
        add column if not exists reception_observations text,
        add column if not exists technical_observations text,
        add column if not exists components_used text,
        add column if not exists components_cost decimal(12, 2),
        add column if not exists software_work text,
        add column if not exists final_equipment_state text,
        add column if not exists received_by_name varchar(150),
        add column if not exists final_destination varchar(80)
    `)

    await this.db.rawQuery(`
      alter table attachments
        add column if not exists maintenance_stage varchar(30)
    `)

    await this.db.rawQuery(`
      create table if not exists equipment_groups (
        id uuid primary key default uuid_generate_v4(),
        name varchar(120) not null,
        description text null,
        created_by uuid null references users(id) on delete set null,
        updated_by uuid null references users(id) on delete set null,
        created_at timestamp not null default current_timestamp,
        updated_at timestamp not null default current_timestamp
      )
    `)

    await this.db.rawQuery(`
      create table if not exists equipment_group_items (
        equipment_group_id uuid not null references equipment_groups(id) on delete cascade,
        equipment_id uuid not null references equipment(id) on delete cascade,
        created_at timestamp not null default current_timestamp,
        primary key (equipment_group_id, equipment_id)
      )
    `)

    await this.db.rawQuery('create index if not exists idx_maintenance_records_current_stage on maintenance_records(current_stage)')
    await this.db.rawQuery('create index if not exists idx_attachments_maintenance_stage on attachments(maintenance_stage)')
  }

  async down() {
    this.schema.dropTableIfExists('equipment_group_items')
    this.schema.dropTableIfExists('equipment_groups')

    this.schema.alterTable('attachments', (table) => {
      table.dropColumn('maintenance_stage')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('current_stage')
      table.dropColumn('initial_equipment_state')
      table.dropColumn('reception_observations')
      table.dropColumn('technical_observations')
      table.dropColumn('components_used')
      table.dropColumn('components_cost')
      table.dropColumn('software_work')
      table.dropColumn('final_equipment_state')
      table.dropColumn('received_by_name')
      table.dropColumn('final_destination')
    })
  }
}

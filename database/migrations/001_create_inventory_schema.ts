import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    const uuidDefault = this.raw('uuid_generate_v4()')

    await this.db.rawQuery('create extension if not exists "uuid-ossp"')

    await this.db.rawQuery(`
      do $$
      begin
        if not exists (select 1 from pg_type where typname = 'ownership_type_enum') then
          create type ownership_type_enum as enum ('owned', 'leased');
        end if;
        if not exists (select 1 from pg_type where typname = 'equipment_status_enum') then
          create type equipment_status_enum as enum ('active', 'inactive', 'in_maintenance', 'damaged', 'retired', 'lost');
        end if;
        if not exists (select 1 from pg_type where typname = 'maintenance_type_enum') then
          create type maintenance_type_enum as enum ('preventive', 'corrective');
        end if;
        if not exists (select 1 from pg_type where typname = 'maintenance_status_enum') then
          create type maintenance_status_enum as enum ('scheduled', 'pending', 'in_progress', 'completed', 'cancelled', 'rescheduled', 'overdue');
        end if;
        if not exists (select 1 from pg_type where typname = 'maintenance_priority_enum') then
          create type maintenance_priority_enum as enum ('low', 'medium', 'high', 'critical');
        end if;
        if not exists (select 1 from pg_type where typname = 'attachment_entity_enum') then
          create type attachment_entity_enum as enum ('equipment', 'maintenance_record', 'equipment_assignment');
        end if;
      end $$;
    `)

    this.schema.createTable('roles', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table.string('name', 120).notNullable()
      table.string('slug', 120).notNullable().unique()
      table.text('description').nullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
    })

    this.schema.createTable('permissions', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table.string('name', 150).notNullable()
      table.string('slug', 150).notNullable().unique()
      table.text('description').nullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
    })

    this.schema.createTable('role_permissions', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table.uuid('role_id').notNullable().references('id').inTable('roles').onDelete('CASCADE')
      table
        .uuid('permission_id')
        .notNullable()
        .references('id')
        .inTable('permissions')
        .onDelete('CASCADE')
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.unique(['role_id', 'permission_id'], { indexName: 'uq_role_permission' })
    })

    this.schema.createTable('users', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table.uuid('role_id').nullable().references('id').inTable('roles').onDelete('SET NULL')
      table.string('name', 150).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('phone', 60).nullable()
      table.string('job_title', 120).nullable()
      table.string('department', 120).nullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamp('last_login_at').nullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
      table.timestamp('deleted_at').nullable()
    })

    //sede
    this.schema.createTable('headquarters', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table.string('name', 150).notNullable()
      table.string('city', 120).nullable()
      table.text('address').nullable()
      table.text('description').nullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
    })

    this.schema.createTable('locations', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table
        .uuid('headquarter_id')
        .notNullable()
        .references('id')
        .inTable('headquarters')
        .onDelete('CASCADE')
      table.string('floor', 50).nullable()
      table.string('area', 120).nullable()
      table.string('office', 120).nullable()
      table.text('description').nullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
    })

    this.schema.createTable('equipment', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table.string('internal_code', 100).notNullable().unique()
      table.string('asset_tag', 100).nullable().unique()
      table.string('serial', 150).notNullable().unique()
      table.string('type', 100).notNullable()
      table.string('brand', 120).nullable()
      table.string('model', 120).nullable()
      table.specificType('ownership_type', 'ownership_type_enum').notNullable().defaultTo('owned')
      table.specificType('status', 'equipment_status_enum').notNullable().defaultTo('active')
      table
        .uuid('headquarter_id')
        .nullable()
        .references('id')
        .inTable('headquarters')
        .onDelete('SET NULL')
      table
        .uuid('location_id')
        .nullable()
        .references('id')
        .inTable('locations')
        .onDelete('SET NULL')
      table
        .uuid('current_responsible_id')
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
      table.date('purchase_date').nullable()
      table.date('warranty_until').nullable()
      table.string('lease_provider', 150).nullable()
      table.string('lease_contract_number', 150).nullable()
      table.date('lease_until').nullable()
      table.date('last_maintenance_at').nullable()
      table.date('next_maintenance_at').nullable()
      table.text('notes').nullable()
      table.uuid('created_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.uuid('updated_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
      table.timestamp('deleted_at').nullable()
    })

    this.schema.createTable('equipment_assignments', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table
        .uuid('equipment_id')
        .notNullable()
        .references('id')
        .inTable('equipment')
        .onDelete('CASCADE')
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.uuid('assigned_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.timestamp('assigned_at').notNullable().defaultTo(this.now())
      table.timestamp('returned_at').nullable()
      table.text('notes').nullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
    })

    this.schema.createTable('maintenance_schedules', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table
        .uuid('equipment_id')
        .notNullable()
        .references('id')
        .inTable('equipment')
        .onDelete('CASCADE')
      table.specificType('maintenance_type', 'maintenance_type_enum').notNullable()
      table.specificType('status', 'maintenance_status_enum').notNullable().defaultTo('scheduled')
      table.specificType('priority', 'maintenance_priority_enum').notNullable().defaultTo('medium')
      table.date('scheduled_for').notNullable()
      table
        .uuid('assigned_technician_id')
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
      table.integer('frequency_months').nullable()
      table.text('notes').nullable()
      table.uuid('created_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.uuid('updated_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
    })

    this.schema.createTable('maintenance_records', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table
        .uuid('equipment_id')
        .notNullable()
        .references('id')
        .inTable('equipment')
        .onDelete('CASCADE')
      table
        .uuid('maintenance_schedule_id')
        .nullable()
        .references('id')
        .inTable('maintenance_schedules')
        .onDelete('SET NULL')
      table.specificType('maintenance_type', 'maintenance_type_enum').notNullable()
      table.specificType('status', 'maintenance_status_enum').notNullable().defaultTo('pending')
      table.specificType('priority', 'maintenance_priority_enum').notNullable().defaultTo('medium')
      table.date('scheduled_date').nullable()
      table.timestamp('performed_at').nullable()
      table.uuid('performed_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.text('description').nullable()
      table.text('diagnosis').nullable()
      table.text('actions_taken').nullable()
      table.text('parts_replaced').nullable()
      table.decimal('cost', 12, 2).nullable().defaultTo(0)
      table.date('next_maintenance_at').nullable()
      table.uuid('created_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.uuid('updated_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
    })

    this.schema.createTable('failure_reports', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table
        .uuid('equipment_id')
        .notNullable()
        .references('id')
        .inTable('equipment')
        .onDelete('CASCADE')
      table.uuid('reported_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.string('title', 150).notNullable()
      table.text('description').notNullable()
      table.string('status', 50).notNullable().defaultTo('open')
      table.specificType('priority', 'maintenance_priority_enum').notNullable().defaultTo('medium')
      table
        .uuid('maintenance_record_id')
        .nullable()
        .references('id')
        .inTable('maintenance_records')
        .onDelete('SET NULL')
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
      table.timestamp('closed_at').nullable()
    })

    this.schema.createTable('attachments', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table.specificType('entity_type', 'attachment_entity_enum').notNullable()
      table.uuid('entity_id').notNullable()
      table.string('file_name', 255).notNullable()
      table.text('file_path').notNullable()
      table.string('mime_type', 120).nullable()
      table.bigInteger('size_bytes').nullable()
      table.uuid('uploaded_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.check('size_bytes is null or size_bytes >= 0', [], 'chk_attachment_size')
    })

    this.schema.createTable('access_tokens', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('name', 150).notNullable()
      table.string('token_hash', 255).notNullable().unique()
      table.jsonb('abilities').notNullable().defaultTo('[]')
      table.timestamp('last_used_at').nullable()
      table.timestamp('expires_at').nullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
    })

    this.schema.createTable('audit_logs', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table.uuid('user_id').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.string('action', 120).notNullable()
      table.string('entity_type', 120).nullable()
      table.uuid('entity_id').nullable()
      table.jsonb('old_values').nullable()
      table.jsonb('new_values').nullable()
      table.string('ip_address', 80).nullable()
      table.text('user_agent').nullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
    })

    this.defer((db) =>
      db.rawQuery(`
      create index if not exists idx_users_email on users(email);
      create index if not exists idx_users_role_id on users(role_id);
      create index if not exists idx_locations_headquarter_id on locations(headquarter_id);
      create index if not exists idx_equipment_status on equipment(status);
      create index if not exists idx_equipment_type on equipment(type);
      create index if not exists idx_equipment_brand on equipment(brand);
      create index if not exists idx_equipment_headquarter_id on equipment(headquarter_id);
      create index if not exists idx_equipment_location_id on equipment(location_id);
      create index if not exists idx_equipment_current_responsible_id on equipment(current_responsible_id);
      create index if not exists idx_equipment_next_maintenance_at on equipment(next_maintenance_at);
      create index if not exists idx_equipment_ownership_type on equipment(ownership_type);
      create unique index if not exists uq_active_equipment_assignment on equipment_assignments(equipment_id) where returned_at is null;
      create index if not exists idx_equipment_assignments_equipment_id on equipment_assignments(equipment_id);
      create index if not exists idx_equipment_assignments_user_id on equipment_assignments(user_id);
      create index if not exists idx_maintenance_schedules_equipment_id on maintenance_schedules(equipment_id);
      create index if not exists idx_maintenance_schedules_status on maintenance_schedules(status);
      create index if not exists idx_maintenance_schedules_scheduled_for on maintenance_schedules(scheduled_for);
      create index if not exists idx_maintenance_schedules_technician on maintenance_schedules(assigned_technician_id);
      create index if not exists idx_maintenance_records_equipment_id on maintenance_records(equipment_id);
      create index if not exists idx_maintenance_records_type on maintenance_records(maintenance_type);
      create index if not exists idx_maintenance_records_status on maintenance_records(status);
      create index if not exists idx_maintenance_records_performed_by on maintenance_records(performed_by);
      create index if not exists idx_maintenance_records_performed_at on maintenance_records(performed_at);
      create index if not exists idx_failure_reports_equipment_id on failure_reports(equipment_id);
      create index if not exists idx_failure_reports_reported_by on failure_reports(reported_by);
      create index if not exists idx_failure_reports_status on failure_reports(status);
      create index if not exists idx_attachments_entity on attachments(entity_type, entity_id);
      create index if not exists idx_audit_logs_user_id on audit_logs(user_id);
      create index if not exists idx_audit_logs_entity on audit_logs(entity_type, entity_id);
      create index if not exists idx_audit_logs_action on audit_logs(action);
      create index if not exists idx_audit_logs_created_at on audit_logs(created_at);
    `)
    )
  }

  async down() {
    await this.db.rawQuery(`
      drop table if exists audit_logs cascade;
      drop table if exists access_tokens cascade;
      drop table if exists attachments cascade;
      drop table if exists failure_reports cascade;
      drop table if exists maintenance_records cascade;
      drop table if exists maintenance_schedules cascade;
      drop table if exists equipment_assignments cascade;
      drop table if exists equipment cascade;
      drop table if exists locations cascade;
      drop table if exists headquarters cascade;
      drop table if exists users cascade;
      drop table if exists role_permissions cascade;
      drop table if exists permissions cascade;
      drop table if exists roles cascade;
      drop type if exists attachment_entity_enum cascade;
      drop type if exists maintenance_priority_enum cascade;
      drop type if exists maintenance_status_enum cascade;
      drop type if exists maintenance_type_enum cascade;
      drop type if exists equipment_status_enum cascade;
      drop type if exists ownership_type_enum cascade;
    `)
  }
}

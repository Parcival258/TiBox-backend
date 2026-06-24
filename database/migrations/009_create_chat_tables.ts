import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    const uuidDefault = this.raw('uuid_generate_v4()')

    await this.db.rawQuery(`
      do $$
      begin
        if not exists (select 1 from pg_type where typname = 'chat_conversation_type_enum') then
          create type chat_conversation_type_enum as enum ('direct', 'group');
        end if;
      end $$;
    `)

    this.schema.createTable('chat_conversations', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table.specificType('type', 'chat_conversation_type_enum').notNullable()
      table.string('name', 150).nullable()
      table.uuid('created_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.uuid('last_message_id').nullable()
      table.timestamp('last_message_at').nullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
    })

    this.schema.createTable('chat_participants', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table
        .uuid('conversation_id')
        .notNullable()
        .references('id')
        .inTable('chat_conversations')
        .onDelete('CASCADE')
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('role', 30).notNullable().defaultTo('member')
      table.timestamp('joined_at').notNullable().defaultTo(this.now())
      table.timestamp('last_read_at').nullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
      table.unique(['conversation_id', 'user_id'], { indexName: 'uq_chat_participant_user' })
    })

    this.schema.createTable('chat_messages', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table
        .uuid('conversation_id')
        .notNullable()
        .references('id')
        .inTable('chat_conversations')
        .onDelete('CASCADE')
      table.uuid('sender_id').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.text('body').notNullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
      table.timestamp('deleted_at').nullable()
    })

    this.schema.createTable('chat_message_reads', (table) => {
      table.uuid('id').primary().defaultTo(uuidDefault)
      table
        .uuid('message_id')
        .notNullable()
        .references('id')
        .inTable('chat_messages')
        .onDelete('CASCADE')
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('delivered_at').nullable()
      table.timestamp('read_at').nullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
      table.unique(['message_id', 'user_id'], { indexName: 'uq_chat_message_read_user' })
    })

    this.schema.alterTable('chat_conversations', (table) => {
      table
        .foreign('last_message_id')
        .references('id')
        .inTable('chat_messages')
        .onDelete('SET NULL')
    })

    this.defer((db) =>
      db.rawQuery(`
        create index if not exists idx_chat_conversations_last_message_at on chat_conversations(last_message_at desc);
        create index if not exists idx_chat_participants_user_id on chat_participants(user_id);
        create index if not exists idx_chat_messages_conversation_created on chat_messages(conversation_id, created_at desc);
        create index if not exists idx_chat_message_reads_user_read on chat_message_reads(user_id, read_at);
      `)
    )
  }

  async down() {
    await this.db.rawQuery(`
      drop table if exists chat_message_reads cascade;
      drop table if exists chat_messages cascade;
      drop table if exists chat_participants cascade;
      drop table if exists chat_conversations cascade;
      drop type if exists chat_conversation_type_enum cascade;
    `)
  }
}

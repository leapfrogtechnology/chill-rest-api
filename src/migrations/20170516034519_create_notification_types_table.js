import { seed } from '../seeds/notificationTypes';

exports.up = function(knex) {
  return knex.schema
    .createTable('notification_types', table => {
      table.increments('id').primary();
      table.string('type').notNullable();
      table.jsonb('config').notNullable();
      table.timestamp('created_at');
      table.timestamp('updated_at');
    })
    .then(() => seed(knex));
};

exports.down = function(knex) {
  return knex.schema.dropTable('notification_types');
};

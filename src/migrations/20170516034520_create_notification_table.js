exports.up = function(knex) {
  return knex.schema.createTable('notification', table => {
    table.increments('id').primary();
    table
      .integer('project_id')
      .references('id')
      .inTable('projects')
      .notNullable();
    table.boolean('enabled');
    table
      .integer('notification_type')
      .references('id')
      .inTable('notification_types')
      .notNullable();
    table.jsonb('config').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('notification');
};

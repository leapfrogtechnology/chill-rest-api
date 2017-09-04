exports.up = function(knex) {
  return knex.schema.createTable('default_config', table => {
    table.increments('id').primary();
    table.string('type').notNullable();
    table.jsonb('config').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('default_config');
};

exports.up = function(knex) {
  return knex.schema.createTable('user_project', table => {
    table.increments().primary();
    table.integer('project_id').references('id').inTable('projects').notNullable();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_project');
};

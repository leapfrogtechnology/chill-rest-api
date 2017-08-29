exports.up = function(knex) {
  return knex.schema.createTable('projects', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').notNullable();
        // table.integer('userId').notNullable().references('id').inTable('users');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};

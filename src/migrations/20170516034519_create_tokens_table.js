exports.up = function(knex) {
  return knex.schema.createTable('tokens', table=>{
    table.increments().primary();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.string('refresh_token').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tokens');
};

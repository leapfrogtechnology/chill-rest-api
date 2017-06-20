
export function up(knex) {
  return knex.schema.createTable('statuses', table => {
    table.increments().primary();
    table.string('name').notNullable().unique();
    table.string('description').nullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('statuses');
}


export function up(knex) {
  return knex.schema.createTable('services', table => {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('url').unique().notNullable();
    // Type of the service.
    table.enum('type', ['http', 'tcp']).defaultTo('http');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
}

export function down(knex) {
  return knex.schema.dropTable('services');
}

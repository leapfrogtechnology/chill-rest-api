
export function seed(knex) {
  // Deletes ALL existing entries
  return knex('statuses').del()
    .then(function () {
      return knex('statuses').insert([
        { id: 1, name: 'Unknown', description: 'Status of the service is Unknown.' },
        { id: 2, name: 'Up', description: 'Status of the service is Up.' },
        { id: 3, name: 'Down', description: 'Status of the service is Down.' }
      ]);
    });
}

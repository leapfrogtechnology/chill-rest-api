import { UNKNOWN, UP, DOWN } from '../models/Status';

export function seed(knex) {
  // Deletes ALL existing entries
  return knex('statuses').del()
    .then(function () {
      return knex('statuses').insert([
        { id: UNKNOWN, name: 'Unknown', description: 'Status of the service is Unknown.' },
        { id: UP, name: 'Up', description: 'Status of the service is Up.' },
        { id: DOWN, name: 'Down', description: 'Status of the service is Down.' }
      ]);
    });
}

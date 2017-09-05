/**
 * Insert initial data for statuses table.
 *
 * @param {Knex} knex
 * @returns {Promise}
 */
export function seed(knex) {
  let slack = { endpoint: null };
  let hipchat = { authToken: null, roomId: null };
  let twilio = {
    sender: null,
    receiver: null,
    authToken: null,
    accountSId: null
  };
  let email = {
    transport: { service: null, auth: { user: null, pass: null } },
    sender: null,
    receivers: [],
    templateDir: null
  };

  return knex('notification_types').insert([
    {
      type: 'slack',
      config: JSON.stringify(slack)
    },
    { type: 'hipchat', config: JSON.stringify(hipchat) },
    { type: 'twilio', config: JSON.stringify(twilio) },
    { type: 'email', config: JSON.stringify(email) }
  ]);
}

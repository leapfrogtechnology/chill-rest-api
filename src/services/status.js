import Boom from 'boom';
import StatusLog from '../models/StatusLog';

/**
 * Get all status logs.
 *
 * @return {Promise}
 */
export function getAllStatus() {
  return StatusLog.fetchAll();
}

/**
 * Fetch a service grouped by it's name.
 *
 * @param  {String} id
 * @return {Promise}
 */
export function fetchLatestStatuses() {
  return StatusLog.fetchLatestStatuses();
}

/**
 * Get a service status logs.
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
export async function getStatus(id) {
  try {
    let status = await new StatusLog({ id }).fetch();

    if (!status) {
      throw new Boom.notFound('Service not found');
    }

    return status;
  } catch (err) {
    throw new Boom.notFound('Internal Server Error');
  }
}

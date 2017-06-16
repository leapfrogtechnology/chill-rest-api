import Boom from 'boom';
import Status from '../models/Status';

/**
 * Get all status.
 *
 * @return {Promise}
 */
export function getAllStatus() {
  return Status.fetchAll();
}

/**
 * Fetch a service grouped by it's name.
 *
 * @param  {String} id
 * @return {Promise}
 */
export function fetchLatestStatuses() {
  return Status.fetchLatestStatuses();
}

/**
 * Get a service status.
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
export async function getStatus(id) {
  return await new Status({ id }).fetch()
    .then(status => {
      if (!status) {
        throw new Boom.notFound('Service not found');
      }

      return status;
    });
}

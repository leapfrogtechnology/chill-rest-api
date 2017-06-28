import logger from '../utils/logger';
import StatusLog from '../models/StatusLog';

/**
 * Get all status logs.
 *
 * @return {Promise}
 */
export function fetchAll() {
  // TODO: Pagination
  return StatusLog.fetchAllLogs();
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
 * Persist a status change log into the database.
 *
 * @param {Object} data
 * @return {Object}
 */
export async function save(data) {
  logger().info('Saving status change log');
  logger().debug('Data: ', data);

  let model = await StatusLog.forge(data).save();

  return model.toJSON();
}

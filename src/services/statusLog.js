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

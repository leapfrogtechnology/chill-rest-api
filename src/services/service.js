import Boom from 'boom';
import logger from '../utils/logger';
import Service from '../models/Service';
import StatusLog from '../models/StatusLog';

/**
 * Fetch all services of user.
 *
 * @return {Promise}
 */
export async function fetchAll(id, userId) {
  return Service.fetchAll(id, userId);
}

/**
 * Fetch a single service by it's id (pk).
 *
 * @param  {string|Number}  projectId, serviceId
 * @return {Promise}
 */
export async function fetch(projectid, serviceid, userId) {
  return Service.get(projectid, serviceid, userId);
}

/**
 * delete a single service by it's projectId.
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
export async function deleteService(projectId, serviceId, userId) {
  return Service.deleteService(projectId, serviceId, userId);
}

/**
 * Fetch the latest status change log for a service by serviceId.
 *
 * @param {Number} serviceId
 * @returns {Promise}
 */
export async function fetchStatus(serviceId) {
  let result = await StatusLog.fetchServiceStatus(serviceId);

  if (!result) {
    throw new Boom.notFound(
      `No recent logs not found for service ${serviceId}.`
    );
  }

  logger().debug('Retrieved last logged status:', result.toJSON());

  return result.toJSON();
}

/**
 * Create and save service data.
 *
 * @param {Object}
 * @returns {Promise}
 */
export async function create(data) {
  try {
    let service = await Service.create(data);

    return service.toJSON();
  } catch (err) {
    logger().error('Error while persisting the service into database', err);
  }
}

/**
 * Update and save service data.
 *
 * @param {Object}
 * @returns {Promise}
 */
export async function updateService(projectId, serviceId, data, userId) {
  return Service.updateService(projectId, serviceId, data, userId);
}

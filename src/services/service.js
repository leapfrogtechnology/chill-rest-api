import Boom from 'boom';
import logger from '../utils/logger';
import Service from '../models/Service';
/**
 * Fetch all services.
 *
 * @return {Promise}
 */
export async function fetchAll() {
  logger().info('Fetching all the services.');

  let result = await Service.fetchAll();

  logger().debug('Retrieved list of services', result.toJSON());

  return result;
}

/**
 * Fetch a single service by it's id (pk).
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
export async function fetch(id) {
  logger().info('Fetching a service by id', { id });

  let result = await new Service({ id }).fetch();

  if (!result) {
    throw new Boom.notFound('Service not found');
  }

  logger().debug('Retrieved service data', result.toJSON());

  return result;
}
import camelize from 'camelize';
import logger from '../utils/logger';
import { getClient } from '../utils/db';
import * as serviceQuery from '../queries/service';
import Boom from 'Boom';

const db = getClient();

// Service types
export const TYPE_HTTP = 'http';
export const TYPE_TCP = 'tcp';

class Service extends db.Model {
  get tableName() {
    return 'services';
  }

  get hasTimestamps() {
    return true;
  }

  /**
  * Create a new Service.
  *
  * @param  {Object} data
  * @return {Promise}
  */
  static async create(data) {
    let service = new Service({
      name: data.name,
      url: data.url,
      project_id: data.projectId,
      type: data.type
    });

    logger().info('Creating a new service');
    logger().debug('Service data', data);

    await service.save();

    logger().info('Service created', { id: service.get('id') });

    return service;
  }

  static async fetchAll(id) {
    logger().info('Fetching the services of projects of project id', { id });
    let results = await db.knex.raw(
      serviceQuery.FETCH_All_SERVICE, [id]
    );
    
    
    return camelize(results.rows);
  }

  static async get(projectId, serviceId) {
    logger().info('Fetching the service', { serviceId });
    let results = await db.knex.raw(
      serviceQuery.FETCH_A_SERVICE, [serviceId, projectId]
    ); 

    
    return camelize(results.rows);  
  }

  static async deleteService( projectId, serviceId ) {
    logger().info('Fetching the service', { serviceId });
    let result = await db.knex.raw(
      serviceQuery.FETCH_A_SERVICE, [serviceId, projectId]
    ); 

    if (!result) {
      throw new Boom.notFound('No service found under the project');
    }
    await db.knex.raw(
      serviceQuery.DELETE_A_SERVICE, [ serviceId, projectId ]
    );
    
    return camelize(result.rows);
  }

  static async updateService(projectId, serviceId, data) {
    logger().info('Updating a service of project', { projectId }, 'where serviceId is', { serviceId });
    let results = await db.knex.raw(
      serviceQuery.FETCH_A_SERVICE, [serviceId, projectId]
    );
      // console.log(results);

    if (results.rowCount === 0) {
      throw new Boom.notFound('No Service Found');
    }

    await db.knex.raw(
        serviceQuery.UPDATE_A_SERVICE_SERVICES, [ data.name, data.url, data.type, serviceId, projectId]
      );
    let updatedResult = await db.knex.raw(
      serviceQuery.FETCH_A_SERVICE, [serviceId, projectId]
    );

    logger().info('service updated');
    
    return camelize(updatedResult.rows);
  }
}

export default Service;

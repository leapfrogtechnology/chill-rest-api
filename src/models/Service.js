import Boom from 'Boom';
import camelize from 'camelize';

import logger from '../utils/logger';
import { getClient } from '../utils/db';
import userProject from './UserProject';

const db = getClient();

export const TYPE_HTTP = 'http';
export const TYPE_TCP = 'tcp';

function checkIfMatch(userId, projectId) {
  return userProject.where({ user_id: userId, project_id: projectId }).fetch();
}

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

  static async fetchAll(projectId, userId) {
    logger().info('checking if user has the project', { projectId });
    let fetchedService;

    try {
      fetchedService = await checkIfMatch(userId, projectId);
    } catch (err) {
      logger().error('Error while persisting the service into database', err);
    }

    if (fetchedService !== null) {
      logger().info('Fetching the services of projects of project id', {
        projectId
      });
      try {
        let results = await Service.where({ project_id: projectId }).fetchAll();
        let data = [];

        for (let i = 0; i < results.length; i++) {
          data[i] = results.models[i].attributes;
        }

        return camelize(data);
      } catch (err) {
        throw new Boom.notFound('no service found');
      }
    } else {
      throw new Boom.notFound('User and Project are not related');
    }
  }

  static async get(projectId, serviceId, userId) {
    logger().info('checking if user has the project');
    let fetchedService;

    try {
      fetchedService = await checkIfMatch(userId, projectId);
    } catch (err) {
      logger().error('Error while persisting the service into database', err);
    }

    if (fetchedService !== null) {
      try {
        logger().info('Fetching the service', { serviceId });
        let results = await Service.where({
          id: serviceId,
          project_id: projectId
        }).fetch();

        return camelize(results.attributes);
      } catch (err) {
        throw new Boom.notFound('no service found');
      }
    } else {
      throw new Boom.notFound('User and Project are not related');
    }
  }

  static async deleteService(projectId, serviceId, userId) {
    logger().info('checking if user has the project');
    let fetchedService;

    try {
      fetchedService = await checkIfMatch(userId, projectId);
    } catch (err) {
      logger().error('Error while persisting the service into database', err);
    }

    if (fetchedService !== null) {
      logger().info('Fetching the service', { serviceId });

      let result = await Service.where({
        id: serviceId,
        project_id: projectId
      }).fetch();

      if (result === null) {
        throw new Boom.notFound('No service found under the project');
      }

      await Service.where({ id: serviceId, project_id: projectId }).destroy();

      return camelize(result.attributes);
    } else {
      throw new Boom.notFound('User and Project are not related');
    }
  }

  static async updateService(projectId, serviceId, data, userId) {
    logger().info('checking if user has the project');
    let fetchedService;

    try {
      fetchedService = await checkIfMatch(userId, projectId);
    } catch (err) {
      logger().error('Error while persisting the service into database', err);
    }

    if (fetchedService !== null) {
      logger().info(
        'Updating a service of project',
        { projectId },
        'where serviceId is',
        { serviceId }
      );
      let results = await Service.where({
        id: serviceId,
        project_id: projectId
      }).fetch();

      if (results === null) {
        throw new Boom.notFound('No Service Found');
      }

      let name = data.name;
      let url = data.url;
      let type = data.type;

      await Service.where({
        id: serviceId,
        project_id: projectId
      }).save(
        {
          name,
          url,
          type
        },
        { patch: true }
      );

      let updatedResult = await Service.where({
        id: serviceId,
        project_id: projectId
      }).fetch();

      logger().info('service updated');

      return camelize(updatedResult.attributes);
    } else {
      throw new Boom.notFound('User and Project are not related');
    }
  }
}

export default Service;

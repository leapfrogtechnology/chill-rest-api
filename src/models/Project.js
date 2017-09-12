import Boom from 'Boom';
import camelize from 'camelize';

import logger from '../utils/logger';
import { getClient } from '../utils/db';
import userProject from './UserProject';
import Notification from './Notification';
import * as projectQuery from '../queries/project';

const db = getClient();

export const TYPE_HTTP = 'http';
export const TYPE_TCP = 'tcp';

function checkIfMatch(userId, projectId) {
  return userProject.where({ user_id: userId, project_id: projectId }).fetch();
}
class Project extends db.Model {
  get tableName() {
    return 'projects';
  }
  get hasTimestamps() {
    return true;
  }
  /**
  * Create a new Project.
  *
  * @param  {Object} data
  * @return {Promise}
  */
  static async create(data) {
    let project = new Project({
      name: data.name,
      description: data.description
    });

    logger().info('Creating a new project');
    logger().debug('Project data', data);
    try {
      await project.save();
      logger().info('Project created', { id: project.get('id') });
      Notification.create(project.get('id'));

      return project;
    } catch (err) {
      logger().error(err);
    }
  }
  static async fetchAll(id) {
    logger().info('Fetching the projects of user', { id });
    let results = await db.knex.raw(projectQuery.FETCH_All_PROJECTS, {
      id
    });

    return camelize(results.rows);
  }
  static async fetchAProject(userId, projectId) {
    logger().info(
      'Fetching a project of user',
      { userId },
      'where projectId is',
      { projectId }
    );
    let results = await db.knex.raw(projectQuery.FETCH_A_PROJECT, {
      userId,
      projectId
    });

    return camelize(results.rows);
  }
  static async deleteProject(userId, projectId) {
    logger().info(
      'Deleting a project of user',
      { userId },
      'where projectId is',
      { projectId }
    );
    let results = await db.knex.raw(projectQuery.FETCH_A_PROJECT, {
      userId,
      projectId
    });

    if (results.rowCount === 0) {
      throw new Boom.notFound('No Project Found');
    }
    db.transaction(async transaction => {
      logger().info('Deleting user project relation entry');
      await userProject
        .where({ project_id: projectId })
        .destroy({ transacting: transaction });
      logger().info('Deleted user project relation entry');
      logger().info('Deleting notification entry');
      await Notification.where({ project_id: projectId }).destroy({
        transacting: transaction
      });
      logger().info('Deleted notification entry');
      logger().info('Finally deleting project');
      await Project.forge({ id: projectId }).destroy({
        transacting: transaction
      });
      logger().info('Finally deleted project');
    });

    return camelize(results.rows);
  }
  static async updateProject(userId, projectId, data) {
    logger().info(
      'Updating a project of user',
      { userId },
      'where projectId is',
      { projectId }
    );
    let results = await db.knex.raw(projectQuery.FETCH_A_PROJECT, {
      userId,
      projectId
    });

    if (results.rowCount === 0) {
      throw new Boom.notFound('No Project Found');
    }
    let name = data.name;
    let description = data.description;

    await Project.where({ id: projectId }).save(
      { name, description },
      { patch: true }
    );

    let updatedResult = await db.knex.raw(projectQuery.FETCH_A_PROJECT, {
      userId,
      projectId
    });

    logger().info('project updated');

    return camelize(updatedResult.rows);
  }
  static async findNotification(projectId) {
    try {
      logger().info('Checking notifications of ', { projectId });
      let result = await Notification.where({ project_id: projectId })
        .orderBy('id', 'ASC')
        .fetchAll();

      return result;
    } catch (err) {
      logger().error(err);
    }
  }
  static async updateNotification(data, projectId, userId) {
    logger().info('checking if user has the project', { projectId });
    let fetchedProject;

    try {
      fetchedProject = await checkIfMatch(userId, projectId);
    } catch (err) {
      logger().error('Error while persisting the service into database', err);
    }

    if (fetchedProject !== null) {
      try {
        for (let i = 0; i < data.length; i++) {
          logger().info('fetching notification of', data[i].notificationType);
          let result = await Notification.where({
            notification_type: data[i].notificationType,
            project_id: projectId
          }).fetch();

          logger().info('updating notification of', data[i].notificationType);
          let newConfig = data[i].config || result.attributes.config;
          let newEnabled = data[i].enabled || result.attributes.enabled;

          await Notification.where({
            project_id: projectId,
            notification_type: data[i].notificationType
          }).save(
            {
              enabled: newEnabled,
              config: newConfig
            },
            { patch: true }
          );
          logger().info('updated notification of', data[i].notificationType);
        }

        return 'values updated';
      } catch (err) {
        logger().error(err);
      }
    } else {
      throw new Boom.notFound('User and Project are not related');
    }
  }
}
export default Project;

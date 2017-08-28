// Project model
import Boom from 'Boom';
import camelize from 'camelize';
import logger from '../utils/logger';
import { getClient } from '../utils/db';
import * as projectQuery from '../queries/project';

const db = getClient();

// Service types
export const TYPE_HTTP = 'http';
export const TYPE_TCP = 'tcp';

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

    await project.save();

    logger().info('Project created', { id: project.get('id') });

    return project;
  }
    
  static async fetchAll(id) {
    logger().info('Fetching the projects of user', { id });
    let results = await db.knex.raw(
            projectQuery.FETCH_All_PROJECTS, [id]
        );

    return camelize(results.rows);
  }

  static async fetchAProject(userId, projectId) {
    logger().info('Fetching a project of user', { userId }, 'where projectId is', { projectId });
    let results = await db.knex.raw(
            projectQuery.FETCH_A_PROJECT, [userId, projectId]
        );

    return camelize(results.rows);
  }

  static async deleteProject(userId, projectId) {
    logger().info('Deleting a project of user', { userId }, 'where projectId is', { projectId });
    let results = await db.knex.raw(
        projectQuery.FETCH_A_PROJECT, [userId, projectId]
      );
      // console.log(results);

    if (results.rowCount === 0) {
      throw new Boom.notFound('No Project Found');
    }

    await db.knex.raw(
        projectQuery.DELETE_A_PROJECT_USERPROJECT, [projectId]
      );

    await db.knex.raw(
        projectQuery.DELETE_A_PROJECT_PROJECTS, [projectId]
      );

    logger().info('project deleted');
    
    return camelize(results.rows);
  }
    

  static async updateProject(userId, projectId, data) {
    logger().info('Updating a project of user', { userId }, 'where projectId is', { projectId });
    let results = await db.knex.raw(
        projectQuery.FETCH_A_PROJECT, [userId, projectId]
      );
      // console.log(results);

    if (results.rowCount === 0) {
      throw new Boom.notFound('No Project Found');
    }

    await db.knex.raw(
        projectQuery.UPDATE_A_PROJECT_PROJECTS, [ data.name, data.description, projectId ]
      );
    let updatedResult = await db.knex.raw(
        projectQuery.FETCH_A_PROJECT, [userId, projectId]
      );

    logger().info('project updated');
    
    return camelize(updatedResult.rows);
  }
}



export default Project;

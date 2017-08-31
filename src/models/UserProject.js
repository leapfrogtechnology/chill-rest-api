import logger from '../utils/logger';
import { getClient } from '../utils/db';

const db = getClient();

export const TYPE_HTTP = 'http';
export const TYPE_TCP = 'tcp';

class UserProject extends db.Model {
  get tableName() {
    return 'user_project';
  }

  get hasTimestamps() {
    return true;
  }

  /**
  * Create a new user project.
  *
  * @param  {Object} data
  * @return {Promise}
  */
  static async create(data) {
    let userProject = new UserProject({
      project_id: data.projectId,
      user_id: data.userId
    });

    logger().info('Creating a new User Project');
    logger().debug('UserProject data', data);

    await userProject.save();

    logger().info('User Project created', { id: userProject.get('id') });

    return userProject;
  }
}

export default UserProject;

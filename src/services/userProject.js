// User project  service

import Boom from 'boom';

import logger from '../utils/logger';
import UserProject from '../models/UserProject';

export async function create(data) {
  try {
    let userProject = await UserProject.create(data);

    return userProject.toJSON();
  } catch (err) {
    logger().error('Error while persisting the project into database', err);
  }
}

export async function getProject(user_id) {
  logger().debug('Fetching userProject by userid', { user_id });

  let result = await new UserProject({ user_id }).fetchAll({
    columns: ['project_id']
  });

  if (!result) {
    throw new Boom.notFound('UserProject not found from id', { user_id });
  }

  logger().debug('Retrieved userProject data', result.toJSON());

  return result;
}

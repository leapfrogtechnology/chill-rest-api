import logger from '../utils/logger';
import Project from '../models/Project';

/**
 * Create and save project data.
 *
 * @param {Object}
 * @returns {Promise}
 */
export async function create( data ) {
    
  try {
    let project = await Project.create(data);

    return project.toJSON();
  } catch (err) {
    logger().error('Error while persisting the project into database', err);
  }
}

/**
 * Fetch a project from projectId.
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
// export async function fetch(id) {
//   logger().debug('Fetching a project by id', { id });

//   let result = await new Project({ id }).fetch();

//   if (!result) {
//     throw new Boom.notFound('Project not found');
//   }

//   logger().debug('Retrieved project data', result.toJSON());

//   return result;
// }

/**
 * Fetch all projects of a user.
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
export async function fetchAll(id) {
     // logger().debug('Fetching all projects of user id', { id });
  return Project.fetchAll(id);
}

 /**
 * Fetch a project from projectId.
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
export async function fetch(userId, ProjectId) {
  return Project.fetchAProject(userId, ProjectId);
}


/**
 * Delete a project from projectId.
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
 export async function deleteProject(userId,projectId) {
     return Project.deleteProject(userId,projectId);
 }

/**
 * Update a project from projectId.
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
 export async function updateProject(userId,projectId,data) {
     //return Project.updateProject(userId,projectId,req.body);
     //console.log(data);
     return Project.updateProject(userId,projectId,data);
 }
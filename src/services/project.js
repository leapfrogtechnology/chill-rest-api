import logger from '../utils/logger';
import Project from '../models/Project';

/**
 * Create and save project data.
 *
 * @param {Object}
 * @returns {Promise}
 */
export async function create(data) {
  try {
    let project = await Project.create(data);

    return project.toJSON();
  } catch (err) {
    logger().error('Error while persisting the project into database', err);
  }
}

/**
 * Fetch all projects of a user.
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
export async function fetchAll(id) {
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
export async function deleteProject(userId, projectId) {
  return Project.deleteProject(userId, projectId);
}

/**
 * Update a project from projectId.
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
export async function updateProject(userId, projectId, data) {
  return Project.updateProject(userId, projectId, data);
}

/**
 * Find notification of a project from projectId.
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
export async function findNotification(projectId) {
  return Project.findNotification(projectId);
}

/**
 * Update notification of a project.
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
export async function updateNotification(data, projectId, userId) {
  return Project.updateNotification(data, projectId, userId);
}

// Project Controller
import * as projectService from '../services/project';
import * as userProjectService from '../services/userProject';

/** 
 * Create a Project
 * Returns the project json.
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
*/
export function create(req, res, next) {
  projectService
    .create(req.body)
    .then(data => {
      let userProjectData = {
        projectId: data.id,
        userId: req.userId
      };

      userProjectService.create(userProjectData).then(userprojectreturn => {
        let totalData = {
          projectData: data,
          userProjectData: userprojectreturn
        };

        res.json(totalData);
      });
    })
    .catch(err => next(err));
}

/**
 * Fetch a project by projectId.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function get(req, res, next) {
  projectService
    .fetch(req.userId, req.params.projectId)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Fetch all projects of user
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */

export function showAll(req, res, next) {
  projectService
    .fetchAll(req.userId)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/** 
 * Delete a project of user
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function deleteProject(req, res, next) {
  projectService
    .deleteProject(req.userId, req.params.projectId)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Update a project of user
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function updateProject(req, res, next) {
  projectService
    .updateProject(req.userId, req.params.projectId, req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Find notification settings  
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function findNotification(req, res, next) {
  projectService
    .findNotification(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Update notification settings  
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function updateNotification(req, res, next) {
  projectService
    .updateNotification(req.body, req.params.id, req.userId)
    .then(data => res.json(data))
    .catch(err => next(err));
}

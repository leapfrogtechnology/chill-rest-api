import HttpStatus from 'http-status-codes';

import * as statusLogService from '../services/statusLog';

/**
 * Get the latest status of all the services.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function getAll(req, res, next) {
  const projectId = req.params.projectId;

  statusLogService
    .fetchAll(projectId)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Get the latest status of all the services.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function getLatestStatus(req, res, next) {
  statusLogService
    .fetchLatestStatuses()
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Save the status change log into the database.
 *
 * @export
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
export function save(req, res, next) {
  const projectId = req.params.projectId;

  statusLogService
    .save(req.body, projectId)
    .then(data => res.status(HttpStatus.CREATED).json(data))
    .catch(err => next(err));
}

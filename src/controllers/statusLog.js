import * as statusLogService from '../services/statusLog';

/**
 * Get the latest status of all the services.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function getAll(req, res, next) {
  statusLogService.fetchAll()
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
  statusLogService.fetchLatestStatuses()
    .then(data => res.json(data))
    .catch(err => next(err));
}


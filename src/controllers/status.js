import * as statusService from '../services/status';

/**
 * Get all the statuses.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function getAll(req, res, next) {
  statusService.fetchAll(projectId, serviceId, userId)
    .then(data => res.json(data))
    .catch(err => next(err));
}

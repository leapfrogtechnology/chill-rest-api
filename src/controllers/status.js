import * as statusService from '../services/status';

/**
 * Get the latest status of all the services.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function getStatus(req, res, next) {
  statusService.fetchLatestStatuses()
    .then(data => res.json(data))
    .catch(err => next(err));
}


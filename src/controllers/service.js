import HttpStatus from 'http-status-codes';

import * as persistence from '../services/persistence';
import * as serviceService from '../services/service';

/**
 * Get all the services.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function getAll(req, res, next) {
  serviceService.fetchAll()
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Fetch a single service by it's id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function get(req, res, next) {
  serviceService.fetch(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Synchronizes the configured services with the database
 * and returns a list of services synced with the database.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function synchronize(req, res, next) {
  persistence.synchronize()
    .then(({ created, data }) => {
      res.status(created ? HttpStatus.CREATED : HttpStatus.OK).json(data);
    })
    .catch(err => next(err));
}

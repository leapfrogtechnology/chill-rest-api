import * as serviceService from '../services/service';

/**
 * Get all the services.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function getAll(req, res, next) {
  let projectId = req.params.id;

  serviceService.fetchAll(projectId)
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
  let projectId = req.params.projectid;
  let serviceId = req.params.serviceid;

  serviceService.fetch(projectId, serviceId)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Fetch a latest status of a service by the service id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function getServiceStatus(req, res, next) {
  serviceService.fetchStatus(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/*
    Create a service of project
    Returns the service json
*/
export function create( req, res, next ) {
  let data = {
    name: req.body.name,
    url: req.body.url,
    projectId: req.params.id,
    type: req.body.type
  };

  serviceService.create(data)
        .then(newService =>{
          res.json(newService); })     
        .catch(err => next(err));
}

/*
 * Delete a service of project
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function deleteService( req, res, next ) {
  let projectId = req.params.projectid;
  let serviceId = req.params.serviceid;

  serviceService.deleteService( projectId, serviceId )
    .then(deletedService => res.json(deletedService))
    .catch(err => next(err));
}

/**
 * Update the given service of the user, using the service id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function updateService(req, res, next) {
  let projectId = req.params.projectid;
  let serviceId = req.params.serviceid;

  serviceService.updateService(projectId, serviceId, req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
}

// Project Controller
import * as projectService from '../services/project';
import * as userProjectService from '../services/userProject';

/*
    Create a Project
    Returns the project json
*/
export function create( req, res, next ) {
  projectService.create( req.body )
    .then(data =>{
      let userProjectData = {
        projectId: data.id,
        userId: req.userId
      };

      userProjectService.create(userProjectData)
        .then(userprojectreturn =>{
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
  // let head = req.headers.authorization.split(' ')[1];
  // let value = jwt.decode(head);

  projectService.fetch(req.userId, req.params.projectid)
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

export function showAll( req, res, next ) {
  projectService.fetchAll(req.userId)
    .then(data => res.json(data))
    .catch(err => next(err));
}


/*
 * Delete a project of user
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function deleteProject( req, res, next ) {
  projectService.deleteProject(req.userId, req.params.projectid )
    .then(data => res.json(data))
    .catch(err => next(err));
}

/*
 * Update a project of user
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function updateProject( req, res, next ) {
  projectService.updateProject( req.userId, req.params.projectid, req.body )
    .then(data => res.json(data))
    .catch(err => next(err));
}

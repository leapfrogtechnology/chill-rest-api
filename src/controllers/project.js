// Project Controller
import * as projectService from '../services/project';
import * as userProjectService from '../services/userProject';
import jwt from 'jsonwebtoken';

/*
    Create a Project
    Returns the project json
*/
export function create( req, res, next ) {
  projectService.create( req.body )
    .then(data =>{
            // Call userproject service to map user and project
      let head = req.headers.authorization.split(' ')[1];
      let value = jwt.decode(head);
      let userProjectData = {
        projectId: data.id,
        userId: value.userId
      };
      // res.json(userProjectData);

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
  let head = req.headers.authorization.split(' ')[1];
  let value = jwt.decode(head);

  projectService.fetch(value.userId, req.params.projectid)
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
  let head = req.headers.authorization.split(' ')[1];
  let value = jwt.decode(head);

  projectService.fetchAll(value.userId)
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
export function deleteProject( req , res , next ) {
  let head = req.headers.authorization.split(' ')[1];
  let value = jwt.decode(head);
  
  projectService.deleteProject(value.userId, req.params.projectid )
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
export function updateProject( req , res , next ) {
  let head = req.headers.authorization.split(' ')[1];
  let value = jwt.decode(head);

  projectService.updateProject( value.userId, req.params.projectid , req.body )
    .then(data => res.json(data))
    .catch(err => next(err));
 }
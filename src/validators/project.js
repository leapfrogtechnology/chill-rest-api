import { validate } from '../utils/validator';
import projectSchema from '../schema/project';

/**
 * Validate the post data to add a new Project
 *
 * @param req
 * @param res
 * @param next
 */
export function validateProjectData(req, res, next) {
  return validate(req.body, projectSchema)
    .then(() => next())
    .catch(err => next(err));
}
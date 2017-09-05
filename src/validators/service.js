import { validate } from '../utils/validator';
import serviceSchema from '../schema/services';

/**
 * Validate the post request data of a new Service
 *
 * @param req
 * @param res
 * @param next
 */
export function validateServiceData(req, res, next) {
  return validate(req.body, serviceSchema)
    .then(() => next())
    .catch(err => next(err));
}

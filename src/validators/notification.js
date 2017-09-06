import { validate } from '../utils/validator';
import notificationSchema from '../schema/notification';

/**
 * Validate the post data to update the Notification of a project
 *
 * @param {Object} req
 * @param {function} next
 */
export function validateNotificationData(req, res, next) {
  return validate(req.body, notificationSchema)
    .then(() => next())
    .catch(err => next(err));
}

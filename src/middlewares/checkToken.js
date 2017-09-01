import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';

import * as config from '../config/config';
import * as tokenServices from '../services/token';

/**
 * Access Token authentication middleware function. Error response for middleware 401 UNAUTHORIZED.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */
export async function authenticate(req, res, next) {
  if (!req.header('Authorization')) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Authorization header not present.' });
  }
  const token = req.headers.authorization.split(' ')[1];
  let tokenPayload;

  try {
    tokenPayload = jwt.verify(token, config.get().auth.accessSaltKey);
  } catch (err) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Invalid authorization token.' });
  }
  req.userId = tokenPayload.userId;
  next();
}

/**
 * Refresh Token authentication middleware function for new access token generation. Error response for middleware 401 UNAUTHORIZED.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */

export async function authenticateRefreshToken(req, res, next) {
  const userId = req.params.userId;

  if (!req.body.refreshToken) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Refresh Token not present.' });
  }

  try {
    let tokenData = await tokenServices.fetchToken(userId);

    let refreshToken = tokenData.refresh_token;

    if (!refreshToken) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid refresh token.' });
    }
    let tokenPayload = jwt.verify(
      refreshToken,
      config.get().auth.refreshSaltKey
    );

    req.userId = tokenPayload.userId;

    return next();
  } catch (err) {
    return next(err);
  }
}

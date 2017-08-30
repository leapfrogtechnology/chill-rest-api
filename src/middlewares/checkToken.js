import jwt from 'jsonwebtoken';
import * as key from '../config/key';
import HttpStatus from 'http-status-codes';
import * as tokenServices from '../services/token';

export async function authenticate(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authorization header not present.' });
  }

  const token = req.headers.authorization.split(' ')[1];
  let tokenPayload;

  try {
    tokenPayload = jwt.verify(token, key.AUTHENTICATION_SALT_KEY);
  } catch (err) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid authorization token.' });
  }
  req.userId = tokenPayload.userId;
  next();
}

export async function authenticateRefreshToken(req, res, next) {
  const userId = req.params.userId;

  try {
    let tokenData = await tokenServices.fetchToken(userId);

    let refreshToken = tokenData.refresh_token;

    if (!refreshToken) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid refresh token.' });
    }
    jwt.verify(refreshToken, key.REFRESH_TOKEN_SALT_KEY);

    return next();
  } catch (err) {
    return next(err);
  }
}

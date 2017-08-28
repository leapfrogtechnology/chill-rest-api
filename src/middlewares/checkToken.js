import * as tokenServices from '../services/token';
import jwt from 'jsonwebtoken';

/*
to authenticate the access token
*/
export async function authenticate( req, res, next) {
  let token = req.headers.authorization;
  let head = req.headers.authorization.split(' ')[1];
  let value = jwt.verify(head, 'RESTFULAPI');

  if (!value) {
    res.json({
      message: 'The given token is invalid.'
    });
  }
  if (value) {
    next();
  }
}

/*
to authenticate the refresh token
*/
export async function authenticateRefreshToken( req, res, next) {
  const userId = req.params.userId;

  let tokenData = tokenServices.fetchToken(userId);

  if (tokenData) {
    let refreshToken = tokenData.refresh_token;
    let value = jwt.verify(refreshToken, 'REFRESH');

    if (value) {
      next();
    }
    else {
      res.json({
        message: 'The refresh token provided is no longer valid.'
      });
    }
  }
}

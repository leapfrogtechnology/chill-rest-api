import jwt from 'jsonwebtoken';
import * as tokenServices from '../services/token';

/*
to authenticate the access token
*/
export async function authenticate(req, res, next) {
  let head = req.headers.authorization.split(' ')[1];
  let value = jwt.verify(head, 'RESTFULAPI');

  if (!value) {
    res.json({
      message: 'The given token is invalid.'
    });

    return;
  }

  next();
}

/*
to authenticate the refresh token
*/
export async function authenticateRefreshToken(req, res, next) {
  const userId = req.params.userId;

  try {
    let tokenData = await tokenServices.fetchToken(userId);
    let refreshToken = tokenData.refresh_token;

    if (!refreshToken) {
      res.json({
        message: 'The refresh token provided is no longer valid.'
      });

      return;
    }
    
    jwt.verify(refreshToken, 'REFRESH');
    
    return next();
  } catch (err) {
    return next(err);
  }
}

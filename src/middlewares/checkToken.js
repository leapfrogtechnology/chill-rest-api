import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';
import * as tokenServices from '../services/token';

const AUTHENTICATION_SALT_KEY = 'CHILL_RESTFULAPI';
const REFRESHTOKEN_AUTHENTICATION_SALT_KEY='CHILL_REFRESH';

export async function authenticate(req, res, next) {
  if(!req.header('Authorization')) {
    return res.status(HttpStatus.UNAUTHORIZED).json({message: "Authorization header not present."});
  }
  const token = req.headers.authorization.split(' ')[1];
  let tokenPayload;

  const token = req.headers.authorization.split(' ')[1];
  let tokenPayload;
  try {
    tokenPayload = jwt.verify(token, AUTHENTICATION_SALT_KEY);
    console.log(tokenPayload);
  } catch(err) {
    return res.status(HttpStatus.UNAUTHORIZED).json({message: "Invalid authorization token."});
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
      res.json({
        message: 'The refresh token provided is no longer valid.'
      });
      return;
    }
    jwt.verify(refreshToken, REFRESHTOKEN_AUTHENTICATION_SALT_KEY);
    
    return next();
  } catch (err) {
    return next(err);
  }
}
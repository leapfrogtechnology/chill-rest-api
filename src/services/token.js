import jwt from 'jsonwebtoken';
import Token from '../models/Token';
import logger from '../utils/logger';
import * as config from '../config/config';
import * as generateTokens from '../jwt';

/**
* Fetch a project from projectId.
*
* @param  {Object} data
*/
export async function createToken(data) {
  try {
    await Token.create(data);
  } catch (err) {
    logger().error(
      'Error while trying to enter token data into the Token table'
    );
  }
}

/**
* Fetch refresh token information using refreshToken.
*
* @param  {string}  refreshToken
* @return {Promise}
*/
export async function fetchToken(refresh_token) {
  try {
    let result = await new Token({ refresh_token }).fetch();

    return result;
  } catch (err) {
    throw err;
  }
}

/**
* Fetch a token from user_id.
*
* @param  {number}  user_id
* @return {Promise}
*/
export async function checkToken(user_id) {
  try {
    let result = await new Token({ user_id }).fetch();

    return result;
  } catch (err) {
    throw err;
  }
}

/**
* Generate new access token, if given refresh token is in database.
*
* @param  {string} refresh_token 
* @return {Promise}
*/
export async function generateAccessToken(refresh_token) {
  try {
    let result = await fetchToken(refresh_token);
    let refreshToken = result.refresh_token;

    jwt.verify(refreshToken, config.get().auth.refreshSaltKey);
    if (result) {
      let accessToken = generateTokens.generateToken(
        result.user_id,
        config.get().auth.accessSaltKey,
        300
      );

      return { accessToken };
    }
  } catch (err) {
    throw err;
  }
}

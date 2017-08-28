import Token from '../models/Token';
import logger from '../utils/logger';
import * as generateTokens from '../jwt';
import jwt from 'jsonwebtoken';

/**
 *insert token data into the table "tokens"
 * 
 */
export async function createToken(data) {
  try {
    let token = await Token.create(data);
  }
  catch (err) {
    logger().error('Error while trying to enter token data into the Token table');
  }
}

/**
 * fetch token data from the table "tokens" using given refreshToken
 * 
 */
export async function fetchToken(refresh_token) {
  try {
    let result = await new Token({ refresh_token }).fetch();
    return result;
  }
  catch (err) {
    throw (err);
  }
}

/**
 *fetch token data from the table "tokens" using userId
 * 
 */
export async function checkToken(user_id) {
  try {
    let result = await new Token({ user_id }).fetch();
    
    return result;
  }
  catch (err) {
    throw (err);
  }
}

/**
 * Function to generate new access token when it expires, after validating the refresh token
 * 
 */
export async function generateAccessToken(refresh_token) {
  try {
    let result = await fetchToken(refresh_token);
    let refreshToken = result.refresh_token;

    jwt.verify(refreshToken, 'REFRESH');
    if (result) {
      let accessToken = generateTokens.generateToken(result.user_id, 'RESTFULAPI', 300);

      
      return ({ accessToken });
    }
  }
  catch (err) {
    throw (err);
  }
}

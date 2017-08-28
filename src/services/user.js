import User from '../models/User';
import Boom from 'boom';
import logger from '../utils/logger';
import * as tokenService from './token';
import * as generateTokens from '../jwt';
import jwt from 'jsonwebtoken';

/**
 * Create new user in database.
 *
 * @param {string}
 * @returns {Promise}
 */
export async function createUser(data) {
  try {
    let user = await User.create(data);
    // return userData.toJSON();
  }
  catch (err) {
    logger().error('Error while trying to enter data into the User table');
  }
}

/**
 * Check the database to see if user exists and if exists, return token. 
 * Otherwise, create new user in database and return token.
 *
 * @param {string}
 * @returns {Promise}
 */

export async function loginOrSignUp(data) {
  try {

    let email = data.email;
    let userInfo = await fetchByEmail(email);

    console.log(userInfo);

    if (userInfo) {
      let accessToken = generateTokens.generateToken(userInfo.id, 'RESTFULAPI', 300);
      let id = userInfo.id;
      let tokenData = await tokenService.checkToken(id);    
      let refreshToken = tokenData.attributes.refreshToken;
      let decode=jwt.decode(refreshToken);
      console.log(decode);

      logger().debug('Retrieved user data', userInfo.toJSON());
      return ({ accessToken, refreshToken });
    }
    else {
      let user = await createUser(data);
      let userInfo = await fetchByEmail(data.email);
      let accessToken = generateTokens.generateToken(userInfo.id, 'RESTFULAPI', 300);
      let refreshToken = generateTokens.generateToken(userInfo.id, 'REFRESH', 172800);
      let tokenTable = {
        refreshToken: refreshToken,
        userId: userInfo.id
      };

      tokenService.createToken(tokenTable);
      
      return ({ accessToken, refreshToken });
    }
  }  
  catch (err) {
    logger().error('Error while trying to log in');
  }
}

/**
 * Fetch User by email.
 *
 * @param {string}
 * @returns {Promise}
 */
export async function fetchByEmail(email) {
  logger().debug('Fetching a user by email', { email });
 
  try {
    let result = await new User({ email }).fetch();

    
    return result;
  } 
  catch (err) {
    throw err;
  }
}

/**
 * Fetch User from id.
 *
 * @param {string}
 * @returns {Promise}
 */
export async function fetchById(id) {
  logger().debug('Fetching a user by id', { id });

  let result = await new User({ id }).fetch();

  if (!result) {
    throw new Boom.notFound('User not found');
  }

  logger().debug('Retrieved user data', result.toJSON());
  
  return result;
}

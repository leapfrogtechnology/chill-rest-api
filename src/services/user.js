import Boom from "boom";
import jwt from "jsonwebtoken";
import User from "../models/User";
import logger from "../utils/logger";
import * as tokenService from "./token";
import * as generateTokens from "../jwt";

/**
 * Create new user in database.
 *
 * @param {string}
 * @returns {Promise}
 */
export async function createUser(data) {
  try {
    await User.create(data);
  } catch (err) {
    logger().error("Error while trying to enter data into the User table");
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

    if (userInfo) {
      let accessToken = generateTokens.generateToken(
        userInfo.id,
        key.AUTHORIZATION_SALT_KEY,
        300
      );
      let id = userInfo.id;
      let tokenData = await tokenService.checkToken(id);
      let refreshToken = tokenData.attributes.refreshToken;
      let divisor = Date.now() / 1000;
      let expiryTime = jwt.decode(refreshToken).exp;

      if (expiryTime > divisor) {
        return { accessToken, refreshToken };
        // logger().debug('Retrieved user data', userInfo.toJSON());
      } else {
        let refreshToken = generateTokens.generateToken(
          userInfo.id,
          key.REFRESH_TOKEN_SALT_KEY,
          172800
        );
        let tokenTable = {
          userId: userInfo.id,
          refreshToken: refreshToken
        };

        tokenService.createToken(tokenTable);

        return { accessToken, refreshToken };
      }
    } else {
      await createUser(data);
      let userInfo = await fetchByEmail(data.email);
      let accessToken = generateTokens.generateToken(
        userInfo.id,
        key.AUTHORIZATION_SALT_KEY,
        300
      );
      let refreshToken = generateTokens.generateToken(
        userInfo.id,
        key.REFRESH_TOKEN_SALT_KEY,
        172800
      );
      let tokenTable = {
        userId: userInfo.id,
        refreshToken: refreshToken
      };

      tokenService.createToken(tokenTable);

      return { accessToken, refreshToken };
    }
  } catch (err) {
    logger().error("Error while trying to log in");
  }
}

/**
 * Fetch User by email.
 *
 * @param {string}
 * @returns {Promise}
 */
export async function fetchByEmail(email) {
  logger().debug("Fetching a user by email", { email });
  try {
    let result = await new User({ email }).fetch();

    return result;
  } catch (err) {
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
  logger().debug("Fetching a user by id", { id });

  let result = await new User({ id }).fetch();

  if (!result) {
    throw new Boom.notFound("User not found");
  }
  logger().debug("Retrieved user data", result.toJSON());

  return result;
}

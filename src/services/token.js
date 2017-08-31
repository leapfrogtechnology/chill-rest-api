import jwt from "jsonwebtoken";
import Token from "../models/Token";
import logger from "../utils/logger";
import * as generateTokens from "../jwt";

export async function createToken(data) {
  try {
    await Token.create(data);
  } catch (err) {
    logger().error(
      "Error while trying to enter token data into the Token table"
    );
  }
}

export async function fetchToken(refresh_token) {
  try {
    let result = await new Token({ refresh_token }).fetch();

    return result;
  } catch (err) {
    throw err;
  }
}

export async function checkToken(user_id) {
  try {
    let result = await new Token({ user_id }).fetch();

    return result;
  } catch (err) {
    throw err;
  }
}

export async function generateAccessToken(refresh_token) {
  try {
    let result = await fetchToken(refresh_token);
    let refreshToken = result.refresh_token;

    jwt.verify(refreshToken, key.REFRESH_TOKEN_SALT_KEY);
    if (result) {
      let accessToken = generateTokens.generateToken(
        result.user_id,
        key.AUTHORIZATION_SALT_KEY,
        300
      );

      return { accessToken };
    }
  } catch (err) {
    throw err;
  }
}

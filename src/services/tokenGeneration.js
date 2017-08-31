import * as generateTokens from "../jwt";
import * as config from "../config/config";

/**
* Generate new access token and refresh token, given id
*
* @param  {Number}  id
*/

export async function provideToken(id) {
  return new Promise(resolve => {
    let accessToken = generateTokens.generateToken(
      id,
      config.get().auth.accessSaltKey,
      300
    );

    let refreshToken = generateTokens.generateToken(
      id,
      config.get().auth.refreshSaltKey,
      172800
    );

    resolve({ accessToken, refreshToken });
  });
}

import * as generateTokens from '../jwt';
import * as config from '../config/config';

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
      config.get().auth.accessTime
    );

    let refreshToken = generateTokens.generateToken(
      id,
      config.get().auth.refreshSaltKey,
      config.get().auth.refreshTime
    );

    resolve({ accessToken, refreshToken });
  });
}

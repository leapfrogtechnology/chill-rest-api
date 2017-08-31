import * as generateTokens from '../jwt';
import * as key from '../config/key';

export async function provideToken(id) {
  return new Promise(resolve => {
    let accessToken = generateTokens.generateToken(
      id,
      key.AUTHORIZATION_SALT_KEY,
      300
    );

    let refreshToken = generateTokens.generateToken(
      id,
      key.REFRESH_TOKEN_SALT_KEY,
      172800
    );

    resolve({ accessToken, refreshToken });
  });
}

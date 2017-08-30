import * as generateTokens from '../jwt';
const AUTHORIZATION_SALT_KEY = 'CHILL_RESTFULAPI';
const REFRESH_TOKEN_SALT_KEY = 'CHILL_REFRESH';

export async function provideToken(id) {
  return new Promise((resolve)=>{
    let accessToken = generateTokens.generateToken(id, AUTHORIZATION_SALT_KEY, 300);
    let refreshToken = generateTokens.generateToken(id, REFRESH_TOKEN_SALT_KEY, 172800);

    resolve({ accessToken, refreshToken });
  });
}


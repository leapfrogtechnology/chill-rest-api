import * as generateTokens from '../jwt';

/**
 * Generate access token and refresh token, given userId. 
 *
 */

export async function provideToken(id) {
  return new Promise((resolve, reject)=>{
    let accessToken = generateTokens.generateToken(id, 'RESTFULAPI', 300);
    let refreshToken = generateTokens.generateToken(id, 'REFRESH', 172800);

    resolve({ accessToken, refreshToken });
  });
}


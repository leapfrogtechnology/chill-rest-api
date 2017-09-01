import jwt from 'jsonwebtoken';

/**
* Generate new Token using userId, Salt key and time (in seconds).
*
* @param  {Number}  userId
* @return {string|Number} 
*/
export function generateToken(userId, secret, time) {
  return jwt.sign({ userId }, secret, { expiresIn: time + 's' });
}

/**
* Verify the Token by decoding the token and comparing with the Salt key
*
* @param  {string|Number}  Token
* @return {Promise}
*/
export function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

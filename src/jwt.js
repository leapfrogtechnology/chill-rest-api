// JWT
import jwt from 'jsonwebtoken';

/**
 *generate jwt tokens
 * 
 */
export function generateToken(userId, secret, time) {
  return jwt.sign({ userId }, secret, { expiresIn: time + 's' });
}

/**
 *verify the jwt token
 * 
 */
export function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

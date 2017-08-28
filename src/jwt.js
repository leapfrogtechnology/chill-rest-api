// JWT
import jwt from 'jsonwebtoken';

// generate JWT tokens
export function generateToken(userId, secret, time) {
  return jwt.sign({ userId }, secret, { expiresIn: time + 's' });
}

// verify the JWT token
export function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

import jwt from 'jsonwebtoken';

export function generateToken(userId, secret, time) {
  return jwt.sign({ userId }, secret, { expiresIn: time + 's' });
}

export function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

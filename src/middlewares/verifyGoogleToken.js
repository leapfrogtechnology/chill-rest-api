import GoogleAuth from 'google-auth-library';
import HttpStatus from 'http-status-codes';

import * as config from '../config/config';

let auth = new GoogleAuth();

/**
 * Verify the user with google server using google-auth-library.
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {function} next 
 */

export function verifyToken(req, res, next) {
  let data;
  let userId;
  let payload;
  let token = req.body.tokenId;

  let clientId = config.get().googleOAuth.clientID;
  let client = new auth.OAuth2(clientId);

  client.verifyIdToken(token, clientId, (e, login) => {
    payload = login.getPayload();
    userId = payload['sub'];
  });

  if (payload) {
    data = {
      id: userId,
      name: payload['name'],
      email: payload['email'],
      image: payload['picture']
    };
    req.user = data;

    return next();
  } else {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Unauthorized access' });
  }
}

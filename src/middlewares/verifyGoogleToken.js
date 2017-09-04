import GoogleAuth from 'google-auth-library';
import HttpStatus from 'http-status-codes';

let auth = new GoogleAuth();

/**
 * Verify the user with google server using google auth library.
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */

export function verifyToken(req, res, next) {
  let clientId =
    '739933093379-7q3mdd5pec4pj9n8vhpgfpdv7ijqcgtc.apps.googleusercontent.com';
  let client = new auth.OAuth2(clientId);
  let token = req.body.tokenId;
  let payload;
  let userId;
  let data;

  client.verifyIdToken(token, clientId, function(e, login) {
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

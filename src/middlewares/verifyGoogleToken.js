import GoogleAuth from 'google-auth-library';

import * as config from '../config/config';

let auth = new GoogleAuth();

let clientId = config.get().auth.googleAuth.clientID;
let client = auth.OAuth2(clientId);

export function verifyToken(req, res, next) {
  let token = req.body;
  client.verifyIdToken(token, clientId, function(e, login) {
    var payload = login.getPayload();
    var userid = payload['sub'];
  });
}

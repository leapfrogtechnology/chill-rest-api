import passport from 'passport';
import GooglePassport from 'passport-google-oauth';

import * as config from '../config/config';

let GoogleStrategy = GooglePassport.OAuth2Strategy;
let passportInstance;

/**
 * Create a new passport instance.
 * Return the same passport instance if it is already created.
 *
 * @returns {Object}
 */
export function getPassportInstance() {
  if (passportInstance) {
    return passportInstance;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.get().auth.googleAuth.clientID,
        callbackURL: config.get().auth.googleAuth.callbackURL,
        clientSecret: config.get().auth.googleAuth.clientSecret
      },
      function(accessToken, refreshToken, profile, done) {
        const { id, displayName, emails, _json } = profile;
        let data = {
          id,
          accessToken,
          name: displayName,
          email: emails[0].value,
          image: _json.image.url
        };

        return done(null, data);
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passportInstance = passport;

  return passportInstance;
}

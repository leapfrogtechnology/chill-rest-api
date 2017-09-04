import passport from 'passport';
import * as config from '../config/config';
import GooglePassport from 'passport-google-oauth';

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
        clientID: config.get().googleAuth.clientID,
        callbackURL: config.get().googleAuth.callbackURL,
        clientSecret: config.get().googleAuth.clientSecret
      },
      function(accessToken, refreshToken, profile, done) {
        let data = {
          id: profile.id,
          accessToken: accessToken,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile._json.image.url
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

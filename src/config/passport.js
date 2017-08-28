import passport from 'passport';
import GooglePassport from 'passport-google-oauth';
import * as clientInfo from './auth';
// import * as User from '../models/users';

let GoogleStrategy = GooglePassport.OAuth2Strategy;
/*

Use the GoogleStrategy within Passport.
  Strategies in Passport require a `verify` function, which accept
  credentials (in this case, an accessToken, refreshToken, and Google
  profile), and invoke a callback with a user object.
*/

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: clientInfo.googleAuth.clientID,
    clientSecret: clientInfo.googleAuth.clientSecret,
    callbackURL: clientInfo.googleAuth.callbackURL
  },
  
  function(accessToken, refreshToken, profile, done) {
    let data = {
      'id': profile.id,
      'name': profile.displayName,
      'email': profile.emails[0].value,
      'accessToken': accessToken,
      'image': profile._json.image.url
    };
        
    return done(null, data);
  }
));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
};

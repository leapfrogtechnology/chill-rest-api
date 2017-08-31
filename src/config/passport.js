import * as config from "../config/config";
import GooglePassport from "passport-google-oauth";

let GoogleStrategy = GooglePassport.OAuth2Strategy;

module.exports = function(passport) {
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
};

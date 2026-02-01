import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv";
dotenv.config();


 
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECERT,
    callbackURL: process.env.CALLBACK_URI
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("profile",profile)
    return cb(null, profile);
    // save data in db
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

//session me save krta hai
passport.serializeUser(function(user, done) {
  done(null, user);
});

//data session se remove krta hai
passport.deserializeUser(function(user, done) {
    done(null, user);
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
});



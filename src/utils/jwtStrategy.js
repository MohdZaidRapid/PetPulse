import passport from "passport";
// const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
// const { secret } = require("./config");
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
const User = require("./models/user"); // Your User model file path

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    },
    (jwtPayload, done) => {
      User.findById(jwtPayload.sub, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

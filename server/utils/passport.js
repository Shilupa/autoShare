"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcryptjs");
const { getUserLogin } = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

// local strategy for username password login
passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const params = [email];
      try {
        const [user] = await getUserLogin(params);
        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        if (!(await bcrypt.compare(password, user.password))) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        delete user.password;
        return done(null, { ...user }, { message: "Logged In Successfully" });
      } catch (err) {
        console.log("err done", err.message);
        return done(err);
      }
    }
  )
);

// JWT strategy for handling bearer token
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      //console.log(jwtPayload);
      return done(null, jwtPayload);
    }
  )
);

module.exports = passport;
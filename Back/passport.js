const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const UserController = require('./server/controllers').UserController;
const User = require('./server/models').User;
const errorCodes = require('./server/config/errorCodes');
var dotenv = require('dotenv').config();

//JWT Strategy
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}, async (payload, done) => {
    try {
        const user = await User.findOne({ where: { Oid: payload.user.Oid } });
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

//Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password',
    passReqToCallback: true
}, async (req, Username, Password, done) => {
    try {
        const user = await User.scope('withPassword').findOne({ where: { Username } });
        if (!user) {
            return done(null, false, errorCodes.UsernamePassword);
        }
        if (!user.validatePassword(Password)) {
            return done(null, false, errorCodes.UsernamePassword);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));


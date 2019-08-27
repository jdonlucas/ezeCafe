var dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const errorCodes = require('./config/errorCodes');

const Middlewares = {
    passportLocalStrategy(req, res, next) {
        Middlewares.passportCustomCallback(req, res, next, 'local');
    },
    
    passportCustomCallback(req, res, next, strategy) {
        passport.authenticate(strategy, { session: false }, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(500).json(info);
            }
            req.user = user;
            next();
        })(req, res, next);
    }
}

module.exports = Middlewares;
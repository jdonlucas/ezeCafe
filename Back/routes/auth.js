var express = require('express');
var router = express.Router();
const AuthController = require('../server/controllers/AuthController');
const SharedController = require('../server/controllers/SharedController');
const middlewares = require('../server/middlewares');
const passport = require('passport');

router.post('/localLogin', [middlewares.passportLocalStrategy], AuthController.signin);
router.post('/signup', AuthController.signup);

module.exports = router;
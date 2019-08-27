var express = require('express');
var router  = express.Router();
const UserController = require('../server/controllers/UserController');

router.post('/', UserController.create);


module.exports = router;

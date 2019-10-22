var express = require('express');
var router  = express.Router();
const UserController = require('../server/controllers/UserController');

router.post('/', UserController.create);
router.get('/list', UserController.index);
router.post('/delete', UserController.delete);
router.post('/update', UserController.update);


module.exports = router;

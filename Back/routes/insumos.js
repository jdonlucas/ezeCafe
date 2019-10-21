var express = require('express');
var router = express.Router();
const InsumosController = require('../server/controllers/InsumosController');

router.post('/new', InsumosController.create);
router.post('/update', InsumosController.update);
router.get('/list', InsumosController.index);
router.post('/one', InsumosController.show);
router.post('/delete', InsumosController.delete);


module.exports = router;
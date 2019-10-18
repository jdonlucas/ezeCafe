var express = require('express');
var router = express.Router();
const StockController = require('../server/controllers/StockController');

router.post('/new', StockController.create);
router.post('/update', StockController.update);
router.post('/list', StockController.index);
router.post('/one', StockController.show);
router.post('/delete', StockController.delete);


module.exports = router;
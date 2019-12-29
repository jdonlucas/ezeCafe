var express = require('express');
var router = express.Router();
const SalesController = require('../server/controllers/SalesController');

//routes for food menu
router.post('/newSale', SalesController.create);
router.post('/updateSale', SalesController.update);
router.get('/listAllSales', SalesController.index);
router.post('/showSale', SalesController.show);
router.post('/deleteSale', SalesController.delete);
//routes for beverages menu
router.post('/newStatus', SalesController.createStatusCaja);
router.post('/updateStatus', SalesController.updateStatusCaja);
router.get('/listAllStatus', SalesController.indexStatusCaja);

module.exports = router;
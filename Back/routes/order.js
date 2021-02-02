var express = require('express');
var router = express.Router();
const OrderController = require('../server/controllers/OrderController');

//routes for General order
router.post('/newOrder', OrderController.create);
router.post('/listAllOrders', OrderController.index);
router.post('/showOrder', OrderController.show);
router.post('/deleteOrder', OrderController.delete);
router.post('/updateOrder', OrderController.update);
//routes for food/beverages order
router.post('/saveItems', OrderController.saveItems);
router.post('/updateFoodOrder', OrderController.updateFoodOrder);
router.post('/updateBeverageOrder', OrderController.updateBeverageOrder);
router.post('/updateSpecialOrder', OrderController.updateSpecialOrder);
router.post('/updateExtraOrder', OrderController.updateExtraOrder);
router.post('/createDiscount', OrderController.createDiscount);
router.post('/updateDiscount', OrderController.updateDiscount);
router.post('/removeDiscount', OrderController.removeDiscount);

module.exports = router;
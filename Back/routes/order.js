var express = require('express');
var router = express.Router();
const OrderController = require('../server/controllers/OrderController');

//routes for General order
router.post('/newOrder', OrderController.create);
router.get('/listAllOrders', OrderController.index);
router.post('/showOrder', OrderController.show);
router.post('/deleteOrder', OrderController.delete);
//routes for food/beverages order
router.post('/newFoodOrder', OrderController.createFood);
router.post('/newBeverageOrder', OrderController.createBeverage);

module.exports = router;
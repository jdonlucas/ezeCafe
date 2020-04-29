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
router.post('/newFoodOrder', OrderController.createFood);
router.post('/newBeverageOrder', OrderController.createBeverage);
router.post('/newSpecialOrder', OrderController.createSpecial);
router.post('/newExtraOrder', OrderController.createExtra);
router.post('/updateFoodOrder', OrderController.updateFoodOrder);
router.post('/updateBeverageOrder', OrderController.updateBeverageOrder);
router.post('/updateSpecialOrder', OrderController.updateSpecialOrder);
router.post('/updateExtraOrder', OrderController.updateExtraOrder);

module.exports = router;
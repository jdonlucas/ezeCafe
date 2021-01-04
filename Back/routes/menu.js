var express = require('express');
var router = express.Router();
const MenuBeveragesController = require('../server/controllers/MenuBeveragesController');
const MenuFoodController = require('../server/controllers/MenuFoodController');
const MenuSpecialController = require('../server/controllers/MenuSpecialController');
const MenuExtraController = require('../server/controllers/MenuExtraController');

//routes for food menu
router.post('/newFood', MenuFoodController.create);
router.post('/updateFood', MenuFoodController.update);
router.get('/listAllFood', MenuFoodController.index);
router.post('/showFood', MenuFoodController.show);
router.post('/deleteFood', MenuFoodController.delete);
//routes for beverages menu
router.post('/newBeverage', MenuBeveragesController.create);
router.post('/newBeverageSpecific', MenuBeveragesController.createSpecific);
router.post('/updateBeverage', MenuBeveragesController.update);
router.post('/updateBeverageSpecific', MenuBeveragesController.updateSpecific);
router.get('/listAllBeverages', MenuBeveragesController.index);
router.post('/listAllBeveragesSpecific', MenuBeveragesController.indexSpecific);
router.post('/showBeverage', MenuBeveragesController.show);
router.post('/showBeverageSpecific', MenuBeveragesController.showSpecific);
router.post('/deleteBeverage', MenuBeveragesController.delete);
router.post('/deleteBeverageSpecific', MenuBeveragesController.deleteSpecific);
//routes for specials and employees
router.post('/newSpecial', MenuSpecialController.create);
router.post('/updateSpecial', MenuSpecialController.update);
router.get('/listAllSpecial', MenuSpecialController.index);
router.post('/showSpecial', MenuSpecialController.show);
router.post('/deleteSpecial', MenuSpecialController.delete);
//routes for extra elements
router.post('/newExtra', MenuExtraController.create);
router.post('/updateExtra', MenuExtraController.update);
router.get('/listAllExtra', MenuExtraController.index);
router.post('/showExtra', MenuExtraController.show);
router.post('/deleteExtra', MenuExtraController.delete);
//routes for discounts
router.post('/newDiscount', DiscountController.create);
router.post('/updateDiscount', DiscountController.update);
router.get('/listAllDiscount', DiscountController.index);
router.post('/showDiscount', DiscountController.show);
router.post('/deleteDiscount', DiscountController.delete);

module.exports = router;
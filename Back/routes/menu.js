var express = require('express');
var router = express.Router();
const MenuBeveragesController = require('../server/controllers/MenuBeveragesController');
const MenuFoodController = require('../server/controllers/MenuFoodController');

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
router.post('/showBeverage', MenuBeveragesController.show);
router.post('/showBeverageSpecific', MenuBeveragesController.showSpecific);
router.post('/deleteBeverage', MenuBeveragesController.delete);



module.exports = router;
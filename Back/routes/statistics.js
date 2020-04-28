var express = require('express');
var router = express.Router();
const StatisticsController = require('../server/controllers/StatisticsController.js');

//routes for total Sales
router.post('/monthSales', StatisticsController.showMonth);
router.post('/weekSales', StatisticsController.showWeek);
router.get('/getYears', StatisticsController.getYears);
router.post('/daySales', StatisticsController.showDay);
router.post('/yearSales', StatisticsController.showYear);
router.post('/getFoods', StatisticsController.getFood);
router.post('/getDrinks', StatisticsController.getDrink);

module.exports = router;
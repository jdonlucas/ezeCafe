var express = require('express');
var router = express.Router();
const StatisticsController = require('../server/controllers/StatisticsController.js');

//routes for total Sales
router.post('/monthSales', StatisticsController.showMonth);
//router.post('/weekSales', StatisticsController.showWeek);
//router.post('/daySales', StatisticsController.showDay);
//router.post('/yearSales', StatisticsController.showYear);

module.exports = router;
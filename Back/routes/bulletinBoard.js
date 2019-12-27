var express = require('express');
var router = express.Router();
const NoticeController = require('../server/controllers/NoticeController');

//routes for ads
router.post('/newAd', NoticeController.create);
router.post('/updateAd', NoticeController.update);
router.get('/listAllAd', NoticeController.index);
router.post('/showAd', NoticeController.show);
router.post('/deleteAd', NoticeController.delete);

module.exports = router;
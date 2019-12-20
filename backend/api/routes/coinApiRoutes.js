const express = require('express');
const checkCors = require('../middlewares/checkCors');
const checkAuth = require('../middlewares/checkAuth');
const coinApiController = require('../controllers/coinApiController');

const router = express.Router();

router.options('/getCoins', checkCors);
router.get('/getCoins', checkCors, checkAuth, coinApiController.getCoins);

module.exports = router;

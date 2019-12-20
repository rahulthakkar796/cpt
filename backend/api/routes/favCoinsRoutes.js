const express = require('express');
const checkCors = require('../middlewares/checkCors');
const checkAuth = require('../middlewares/checkAuth');
const favCoinsController = require('../controllers/favCoinsController');

const router = express.Router();

router.options('/addRemove', checkCors).options('/show', checkCors);

router.post('/addRemove', checkCors, checkAuth, favCoinsController.addRemove);

router.get('/show', checkCors, checkAuth, favCoinsController.show);

module.exports = router;

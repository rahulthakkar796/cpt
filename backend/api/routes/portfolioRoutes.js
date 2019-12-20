const express = require('express');
const checkCors = require('../middlewares/checkCors');
const checkAuth = require('../middlewares/checkAuth');
const portfolioController = require('../controllers/portfolioController');

const router = express.Router();

router
  .options('/update', checkCors)
  .options('/remove/:coinId', checkCors)
  .options('/show', checkCors)
  .options('/sell/:coinId', checkCors);

router
  .post('/update', checkCors, checkAuth, portfolioController.update)
  .post('/remove/:coinId', checkCors, checkAuth, portfolioController.remove);

router.patch('/sell/:coinId', checkCors, checkAuth, portfolioController.sell);

router.get('/show', checkCors, checkAuth, portfolioController.show);

module.exports = router;

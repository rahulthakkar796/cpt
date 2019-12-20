const express = require('express');
const icoController = require('../controllers/icoController');
const checkCors = require('../middlewares/checkCors');
const checkAuth = require('../middlewares/checkAuth');

const router = express.Router();

router.options('/getIcos', checkCors).options('/getUpcoming', checkCors);

router.get('/getIcos', checkCors, checkAuth, icoController.getIcos);

module.exports = router;

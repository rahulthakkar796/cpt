const express = require('express');
const checkCors = require('../middlewares/checkCors');
const checkAuth = require('../middlewares/checkAuth');
const AdminPanelController = require('../controllers/adminPanelController');

const router = express.Router();

router.options('/makeQuery', checkCors).options('makeContact', checkCors);

router
  .post('/makeQuery', checkCors, checkAuth, AdminPanelController.userQuery)
  .post('/makeContact', checkCors, AdminPanelController.contactUs);

module.exports = router;

const express = require('express');
const userController = require('../controllers/userController');
const checkAuth = require('../middlewares/checkAuth');
const uploadProfilePic = require('../middlewares/uploadProfilePic');

const router = express.Router();

router
  .options('/signup')
  .options('/signin')
  .options('/uploadProfilePic')
  .options('/getProfile')
  .options('/feedback')
  .options('allFeedbacks');

router
  .post('/signup', userController.signup)
  .post('/signin', userController.signin)
  .post('/uploadProfilePic', checkAuth, uploadProfilePic, userController.profilePic)
  .post('/feedback', checkAuth, userController.feedback);

router
  .get('/getProfile', checkAuth, userController.getProfile)
  .get('/allFeedbacks', checkAuth, userController.allFeedbacks);

module.exports = router;

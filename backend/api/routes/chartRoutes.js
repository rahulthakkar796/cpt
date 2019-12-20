const express = require('express');
const checkCors = require('../middlewares/checkCors');
const checkAuth = require('../middlewares/checkAuth');
const chartController = require('../controllers/chartController');

const router = express.Router();

router
  .options('/addChart', checkCors)
  .options('/comment/:chartId', checkCors)
  .options('/reply/:commentId', checkCors)
  .options('/posts', checkCors)
  .options('/userPosts', checkCors)
  .options('/singlePost/:chartId', checkCors);

router
  .post('/addChart', checkCors, checkAuth, chartController.addChart)
  .post('/comment/:chartId', checkCors, checkAuth, chartController.comment)
  .post('/reply/:commentId', checkCors, checkAuth, chartController.commentReply);

router
  .get('/posts', checkCors, checkAuth, chartController.showPosts)
  .get('/userPosts', checkCors, checkAuth, chartController.userPosts)
  .get('/singlePost/:chartId', checkCors, checkAuth, chartController.singlePost);

module.exports = router;

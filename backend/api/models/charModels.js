const mongoose = require('mongoose');

const commentReplies = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  reply: {
    type: String
  },
  replyDate: {
    type: Date,
    default: Date.now
  }
});

const chartComments = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  comment: {
    type: String
  },
  replies: {
    type: [commentReplies]
  },
  commentDate: {
    type: Date,
    default: Date.now
  }
});

const chart = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  chartTitle: {
    type: String,
    required: true
  },
  chartImg: {
    type: String,
    required: true
  },
  chartDesc: {
    type: String,
    required: true
  },
  chartComments: {
    type: [chartComments]
  },
  chartAddedDate: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = {
  chart: mongoose.model('chart', chart)
};

const mongoose = require('mongoose');

const query = mongoose.Schema({
  userId: {
    type: String,
    ref: 'user',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  qTitle: {
    type: String,
    required: true
  },
  query: {
    type: String,
    required: true
  },
  queryDate: {
    type: Date,
    default: Date.now
  }
});

const contactUs = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  contactNo: {
    type: Number,
    required: true
  },
  msg: {
    type: String,
    required: true
  },
  contactDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
  Query: mongoose.model('query', query),
  ContactUs: mongoose.model('contactUs', contactUs)
};

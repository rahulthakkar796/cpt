const mongoose = require('mongoose');

const feedback = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  }
});

const user = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  fname: {
    type: String,
    required: true,
    match: /[a-zA-Z]{3,20}/
  },
  lname: {
    type: String,
    required: true,
    match: /[a-zA-Z]{3,20}/
  },
  password: {
    type: String,
    required: true,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]*).{8,}$/
  },
  profilePic: {
    type: String,
    default: null
  },
  signupDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
  user: mongoose.model('user', user),
  feedback: mongoose.model('feedback', feedback)
};

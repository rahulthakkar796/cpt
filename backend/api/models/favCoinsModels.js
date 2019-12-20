const mongoose = require('mongoose');

const favCoin = mongoose.Schema({
  coin: {
    type: String
  },
  fav: {
    type: Boolean
  }
});
const favCoins = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  favCoins: {
    type: [favCoin],
    required: true
  }
});

module.exports = {
  favCoins: mongoose.model('favCoins', favCoins)
};

const mongoose = require('mongoose');

const coinDetails = mongoose.Schema({
  coin: {
    type: String,
    required: true
  },
  coinQty: {
    type: Number,
    required: true
  },
  buyPrice: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  buyDate: {
    type: Date,
    required: true
  },
  exchange: {
    type: String,
    enum: ['Binance'],
    required: true
  }
});

const portfolio = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  coins: {
    type: [coinDetails]
  },
  portfolioTotal: {
    type: Number,
    default: 0
  },
  portfolioCreationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
  portfolio: mongoose.model('portfolio', portfolio)
};

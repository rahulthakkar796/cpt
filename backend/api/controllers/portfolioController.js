const Portfolio = require('../models/portfolioModels').portfolio;

exports.update = async (req, res) => {
  try {
    const userId = req.userData.id;
    const userEmail = req.userData.email;
    const c = req.body.coins;
    const totalPrice = c[0].buyPrice * c[0].coinQty;
    const portfolioTotal = totalPrice;
    const coins = [
      {
        coin: c[0].coin,
        coinQty: c[0].coinQty,
        buyPrice: c[0].buyPrice,
        totalPrice,
        buyDate: c[0].buyDate,
        exchange: c[0].exchange
      }
    ];

    const portfolio = await Portfolio.find({ userId });

    if (portfolio.length === 0) {
      const newPortfolio = new Portfolio({ userId, userEmail, portfolioTotal, coins });
      await newPortfolio.save();
      return res.status(201).json({ msg: 'Portfolio Created' });
    }

    if (portfolio.length === 1) {
      await Portfolio.updateOne({ userId }, { $push: { coins }, $inc: { portfolioTotal } });
      return res.status(201).json({ msg: 'Portfolio Updated' });
    }

    throw new Error('Somehing went wrong');
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.remove = async (req, res) => {
  try {
    const userId = req.userData.id;
    const _id = req.params.coinId;
    const toMinus = req.body.portfolioMinus;

    const coin = await Portfolio.findOne({ userId, coins: { $elemMatch: { _id } } });

    if (coin) {
      console.log(coin);
      await Portfolio.updateOne(
        { userId },
        { $inc: { portfolioTotal: -toMinus }, $pull: { coins: { _id } } }
      );
      return res.status(200).json({ msg: 'coin removed from portfolio' });
    }

    throw new Error('Something went wrong');
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.sell = async (req, res) => {
  try {
    const userId = req.userData.id;
    const coinId = req.params.coinId;
    const toMinus = req.body.portfolioMinus;
    const qtyMinus = req.body.coinQty;
    const selling = await Portfolio.updateOne(
      { userId, 'coins._id': coinId },
      {
        $inc: {
          portfolioTotal: -toMinus,
          'coins.$.coinQty': -qtyMinus,
          'coins.$.totalPrice': -toMinus
        }
      }
    );

    return res.status(200).json({ msg: 'success', selling });
  } catch (error) {
    // REMEMBER: remove logs
    console.log(error.stack);
    return res.status(500).json({ error });
  }
};

exports.show = async (req, res) => {
  try {
    const userId = req.userData.id;
    const portfolio = await Portfolio.find({ userId }).select({
      _id: 0,
      userId: 0,
      userEmail: 0,
      __v: 0
    });
    return res.status(200).json({ portfolio });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

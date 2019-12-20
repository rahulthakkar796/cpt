const FavCoins = require('../models/favCoinsModels').favCoins;

exports.addRemove = async (req, res) => {
  try {
    const userId = req.userData.id;
    const userEmail = req.userData.email;
    const favCoins = req.body.favCoins;
    const favCoin = req.body.favCoins[0].coin;

    const allFavCoins = await FavCoins.find({ userId });

    if (allFavCoins.length === 0) {
      const newFavCoin = new FavCoins({ userId, userEmail, favCoins });
      await newFavCoin.save();
      return res.status(201).json({ msg: `${favCoin} added to favourite collection` });
    }

    if (allFavCoins.length === 1) {
      const coinInCollection = await FavCoins.find({ userId, 'favCoins.coin': favCoin });

      if (coinInCollection.length === 0) {
        await FavCoins.updateOne({ userId }, { $push: { favCoins } });
        return res.status(201).json({ msg: `${favCoin} added to favourite collection` });
      }

      await FavCoins.updateOne({ userId }, { $pull: { favCoins: { coin: favCoin } } });
      return res.status(200).json({ msg: `${favCoin} removed from fav collection` });
    }

    throw new Error('Something went wrong');
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.show = async (req, res) => {
  try {
    const userId = req.userData.id;
    const allFavCoins = await FavCoins.find({ userId }).select({
      _id: 0,
      userId: 0,
      __v: 0
    });
    return res.status(200).json({ allFavCoins });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

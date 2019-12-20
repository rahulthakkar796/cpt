const axios = require('axios');
const stringify = require('json-stringify-safe');

exports.getCoins = async (req, res) => {
  try {
    let coins = await axios({
      method: 'get',
      url: 'https://api.binance.com/api/v1/ticker/24hr'
    });
    coins = await stringify(coins, null, 2);
    const coinData = JSON.parse(coins).data.map(element => [
      element.symbol,
      element.lastPrice,
      element.priceChangePercent,
      false
    ]);
    coinData.sort((a, b) => {
      if (a[0] === b[0]) return 0;
      return a[0] < b[0] ? -1 : 1;
    });
    return res.status(200).json({ coinData });
  } catch (error) {
    return res.status(500).json({ error: error.stack });
  }
};

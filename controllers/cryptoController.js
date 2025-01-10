const Crypto = require('../models/Crypto');

exports.getCryptoStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin query parameter is required' });
  }

  const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });

  if (!latestData) {
    return res.status(404).json({ error: 'Data not found for the requested coin' });
  }

  res.json({
    price: latestData.price,
    marketCap: latestData.marketCap,
    '24hChange': latestData.change24h
  });
};

exports.getPriceDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin query parameter is required' });
  }

  const data = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);

  if (data.length < 2) {
    return res.status(400).json({ error: 'Not enough data to calculate deviation' });
  }

  const prices = data.map(entry => entry.price);
  const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
  const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
  const deviation = Math.sqrt(variance);

  res.json({ deviation: parseFloat(deviation.toFixed(2)) });
};

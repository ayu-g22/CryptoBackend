const axios = require('axios');
const Crypto = require('../models/Crypto');


const fetchCryptoData = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin,matic-network,ethereum',
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true'
      }
    });

    const data = response.data;

    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    for (const coin of coins) {
      const cryptoData = new Crypto({
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change
      });
      await cryptoData.save();
    }
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
  }
};

module.exports = { fetchCryptoData };



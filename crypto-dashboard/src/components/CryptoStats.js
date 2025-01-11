import React, { useState } from 'react';
import axios from 'axios';

const CryptoStats = () => {
  const [coin, setCoin] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    setError(null); // Reset error state
    setData(null);  // Reset data state

    try {
      const response = await axios.get(`http://localhost:8000/api/stats?coin=${coin}`);
      setData(response.data); // Set the fetched data
    } catch (err) {
      setError('Error fetching data. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {!data ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter Cryptocurrency (bitcoin, matic-network, ethereum):
              </label>
              <input
                type="text"
                value={coin}
                onChange={(e) => setCoin(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-center text-gray-800">
              Crypto Stats for {coin.charAt(0).toUpperCase() + coin.slice(1)}
            </h1>
            <div className="mt-4 space-y-2">
              <p className="text-lg text-gray-700">Price: ${data.price}</p>
              <p className="text-lg text-gray-700">Market Cap: ${data.marketCap}</p>
              <p className="text-lg text-gray-700">24h Change: {data['24hChange']}%</p>
            </div>
          </div>
        )}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default CryptoStats;

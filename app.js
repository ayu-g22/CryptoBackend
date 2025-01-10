const express = require('express');
const connectDB = require('./config/db');
const cryptoRoutes = require('./routes/cryptoRoutes');
const cryptoService = require('./services/cryptoService');

const cron = require('node-cron');
const app = express();


// Connect to MongoDB
connectDB();

cryptoService.fetchCryptoData();
cron.schedule('0 */2 * * *', cryptoService.fetchCryptoData);

// Middleware
app.use(express.json());

// Routes
app.use('/api', cryptoRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

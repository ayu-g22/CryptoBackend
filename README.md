# CryptoBackend

CryptoBackend is a backend service that provides real-time cryptocurrency data and statistics, including price, market cap, and 24-hour change percentage. The data is fetched from external APIs and stored to be accessed by a front-end application.

## Features
- Fetches real-time cryptocurrency data.
- Supports querying statistics for different cryptocurrencies such as Bitcoin, Ethereum, Matic Network, etc.
- Built with Node.js, Express, and integrates with MongoDB for storing data.
- Uses `node-cron` for periodic data fetching every 1 minute (or any desired interval).
- API route available for fetching cryptocurrency stats.

## Tech Stack
- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for building the backend.
- **MongoDB**: NoSQL database for storing data.
- **Axios**: HTTP client for making API requests to fetch cryptocurrency data.
- **node-cron**: For periodic tasks like fetching data every minute.
- **dotenv**: For managing environment variables like API keys and URLs.

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/ayu-g22/CryptoBackend.git
cd CryptoBackend
```

### 3. Set up environment variables
Create a .env file in the root directory of the project and add the following:
```bash
MONGO_URI=your_mongo_connection_string
API_URL=the_api_url_to_fetch_crypto_data
```

### 4. Run the app

```bash
npm start

```

### 5. Accessing the API

```bash
GET http://localhost:3000/api/stats?coin=bitcoin
```
### 6. Running with cron jobs
The server will fetch cryptocurrency data every minute, ensuring that the data is always up to date. You can adjust the fetch interval as needed in the cron schedule.

### 7. Testing the API

You can test the API directly using Postman, Curl, or your frontend application.

API Routes
GET /api/stats?coin=<coin-name>

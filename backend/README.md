# Backend

Built with Express, MongoDB, Redis and TypeScript.

There is 30 min TTl set in redis to efficiently make use of resources

## Prerequisites

Before running the project locally or in Docker, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended version: v18+)
- [Docker](https://www.docker.com/get-started)

## API information

- API is built with Express, TypeScript, Redis for caching price queries, MongoDb for storing history
- Price service (https://api.binance.com/api/v3/ticker/price)
- Redis TTL is set to 30 mins :)

1. health-check

   ```bash
   http://localhost:5001/history

   HTTP/1.1 200 OK

   {
      "message": "Server is running"
   }
   ```

2. analytics

   ```bash
   http://localhost:5001/analytics?currency=TONUSDT

   HTTP/1.1 200 OK

   {
      "historical_prices": [
         6.218,
         6.619,
         6.673,
         6.21,
         6.27,
         6.456,
         6.89,
         6.597,
         6.538,
      ],
      "latest_price": 5.446,
      "previous_day_price": 5.222,
      "price_percentage": "4.29"
   }
   ```

3. price

   ```bash
   http://localhost:5001/price?symbol=TON/USDT

   HTTP/1.1 200 OK
   {
      "TON/USDT": 5.346,
      "USDT/TON": 0.18705574261129818
   }
   ```

4. history

   ```bash
   http://localhost:5001/history
   HTTP/1.1 200 OK
   {
      "total": 8,
      "skip": 0,
      "limit": 10,
      "history": [
         {
            "pair": "TONUSDT",
            "price": 5.346,
            "inversePrice": 0.18705574261129818,
            "date": "2024-11-11T12:12:09.976Z"
         },
         {
            "pair": "TONUSDT",
            "price": 5.283,
            "inversePrice": 0.1892863903085368,
            "date": "2024-11-11T08:57:19.081Z"
         },
         {
            "pair": "ETHBTC",
            "price": 0.03872,
            "inversePrice": 25.826446280991735,
            "date": "2024-11-11T08:46:25.765Z"
         },
         {
            "pair": "TONUSDT",
            "price": 5.279,
            "inversePrice": 0.18942981625307823,
            "date": "2024-11-11T08:46:13.116Z"
         },
         {
            "pair": "BTCUSDT",
            "price": 81150.4,
            "inversePrice": 0.000012322798162424339,
            "date": "2024-11-11T08:39:01.903Z"
         },
         {
            "pair": "ETHBTC",
            "price": 0.03872,
            "inversePrice": 25.826446280991735,
            "date": "2024-11-11T08:38:59.816Z"
         },
         {
            "pair": "TONUSDT",
            "price": 5.272,
            "inversePrice": 0.1896813353566009,
            "date": "2024-11-11T08:38:53.505Z"
         },
         {
            "pair": "TONUSDT",
            "price": 5.268,
            "inversePrice": 0.18982536066818528,
            "date": "2024-11-11T08:25:09.086Z"
         }
      ]
   }
   ```

## Running Locally

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Add env file
   create `.env` file in backend folder
   To run locally you have the `.env` already

   ```bash
   PORT=5001
   PRICING_SERVICE_API=https://api.binance.com/api/v3/ticker/price
   DBSTRING=mongodb://localhost:27017/
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```

4. Before running the project locally spin the mongodb and redis docker containers in backend folder

   ```bash
   docker-compose up --build -d
   ```

5. Run local server

   ```bash
   npm run dev
   ```

6. Run tests

   ```bash
   npm run test
   ```

   Runs both unit and integration test.

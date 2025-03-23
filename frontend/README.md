# Frontend

Built with vite, react, react-router-dom, react query, rechart, custom hooks, tailwind
There is a 30 min cache set in react query to efficiently make use of resources

## Prerequisites

Before running the project locally or in Docker, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended version: v18+)
- [Docker](https://www.docker.com/get-started)

## Running Locally

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Add env file
   Modify `.env` file in frontend folder
   To run locally you have the `.env` already

   ```bash
   VITE_API_URL=http://localhost:5001
   VITE_ENV=dev
   VITE_QUERY_CACHE_TIME=1800000
   ```

4. Run local server

   ```bash
   npm run dev
   ```

5. Run tests

   ```bash
   npm run test
   ```

   Runs test for custom hooks and Components.

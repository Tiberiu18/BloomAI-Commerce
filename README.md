# E-commerce Software Solution

A full-stack e-commerce platform tailored for businesses in the floral industry. It provides an online storefront backed by an AI-driven recommendation system.

## Features
- Product catalog, orders and user management
- AI-based product recommendations powered by a clustering algorithm
- REST API built with Node.js and Express
- React front end
- MongoDB database

## Getting Started

### Prerequisites
- Node.js 16+
- npm

### Installation
1. Clone the repository.
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
4. Create a `.env` file inside `backend/` using the following variables as a starting point:
   ```ini
   PORT=5000
   MONGO_URL=<your MongoDB connection string>
   JWT_SECRET=<random secret>
   NODE_ENV=production
   ```

### Running the Application
Open two terminals and run the services separately.

1. **Backend**
   ```bash
   cd backend
   npm run server
   ```
2. **Frontend**
   ```bash
   cd frontend
   npm start
   ```

Visit `http://localhost:3000` in your browser.

## AI Recommendation Engine
The application groups users into five clusters based on their orders and suggests popular products from the appropriate cluster. The model currently relies on generated data and should be retrained with real-world data for production use.

## Contributing
We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Code of Conduct
Participating in this project means adhering to our [Code of Conduct](CODE_OF_CONDUCT.md).

## License
This software is available under the [Apache 2.0](LICENSE) license.

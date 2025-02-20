import express, { Express } from 'express';
import { UserModel } from './models';
import routes from './routes/index';
import databaseInit from './database';
import mongoose from 'mongoose'; // Import mongoose
import http from 'http'; // Import http
const STATUS = {
  OK: 200,
  CREATED: 201,
  UPDATED: 201,
  NOT_FOUND: 400,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  DEFAULT_ERROR: 418,
};

let server: Express; // Declare server outside the initialization

async function startServer(): Promise<http.Server> {  // Function to start the server
  server = express(); // Initialize server here
  server.use(express.json()); // Moved before routes
  server.use('/api', routes); // Moved before database connection for test

  try {
    await databaseInit(); // Await database connection

    // Server listening is now inside the startServer function
    const port = process.env.PORT || 3003; // Use environment port if available

    const app = server.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });

    return app; // Return the server instance
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err);
    process.exit(1); // Keep this for initial startup failure
  }
}



export default startServer; // Export the function to start the server

import express from 'express';
import routes from './routes/index';
import { databaseDrop, testDatabaseInit } from './database';
import mongoose from 'mongoose';
import http from 'http';

let server: http.Server | null = null;

async function startServer(): Promise<http.Server> {
  if (server) return server; // Avoid starting multiple servers

  const app = express();
  app.use(express.json());
  app.use('/api', routes);

  await testDatabaseInit();

  const port = process.env.PORT
    ? Number(process.env.PORT)
    : Math.floor(Math.random() * (50000 - 30000) + 30000); // Random port

  server = http.createServer(app).listen(port, () => {
    console.log(`🚀 Test server running on port: ${port}`);
  });

  process.env.TEST_PORT = port.toString();
  return server;
}

async function stopServer() {
  if (server) {
    await databaseDrop();
    await mongoose.connection.close();

    await new Promise<void>((resolve) => server?.close(() => resolve())); // Close HTTP server
    console.log('Server stopped.');
    server = null;
  }
}

export { startServer, stopServer };

import express, { Express } from 'express';
import { UserModel } from './models';
import routes from './routes/index';
import databaseInit from './database';
import mongoose from 'mongoose';
import http from 'http';

const STATUS = {
  OK: 200,
  CREATED: 201,
  UPDATED: 201,
  NOT_FOUND: 400,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  DEFAULT_ERROR: 418,
};

let server: Express;
async function startServer(): Promise<http.Server> {
  server = express();
  server.use(express.json());
  server.use('/api', routes);

  try {
    await databaseInit();
    const port = process.env.PORT ? Number(process.env.PORT) : 0;
    const app = server.listen(port, () => {
      console.log(
        `Test server running on port: ${(app.address() as any).port}`
      );
    });
    return app;
  } catch (err) {
    console.error('Failed to run test server:', err);
    process.exit(1);
  }
}

export default startServer;

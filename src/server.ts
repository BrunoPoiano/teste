import express from 'express';
import { UserModel } from './models';
import routes from './routes/index';
import databaseInit from './database';
const mongoose = require('mongoose');

const server = express();

const STATUS = {
  OK: 200,
  CREATED: 201,
  UPDATED: 201,
  NOT_FOUND: 400,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  DEFAULT_ERROR: 418,
};

server.use('/api', routes);
databaseInit()
  .then(() => {
    server.use(express.json());
    server.use('/api', routes);

    server.listen(3003, () => {
      console.log(`🚀 Server running on http://localhost:3003`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to the database:', err);
    process.exit(1);
  });

export default server

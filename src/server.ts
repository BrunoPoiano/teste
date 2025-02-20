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
const startServer = async () => {
  await databaseInit(); // Aguarda a conexão com o banco antes de iniciar o servidor
  return server.listen(3003, () => {
    console.log('🚀 Server is running on port 3003');
  });
};

export { startServer }; // Exporta a função de inicialização
export default server;

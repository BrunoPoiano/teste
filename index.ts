const express = require('express');
import { databaseInit } from './src/database';
import routes from './src/routes/index';

const app = express();
const PORT = process.env.NODE_PORT;

databaseInit()
  .then(() => {
    app.use(express.json());
    app.use('/api', routes);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to the database:', err);
    process.exit(1);
  });

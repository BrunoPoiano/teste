import dotenv from 'dotenv';
dotenv.config();
const mongoose = require('mongoose');
const testDbName = `app-tese-${Math.floor(Math.random() * 10000)}`; // Unique DB name

const databaseInit = async (test = false) => {
  const password = process.env.MONGO_PASSWORD;
  const username = process.env.MONGO_USERNAME;
  const port = process.env.MONGO_PORT;
  const db_name = process.env.MONGO_NAME;
  const mongo_container_name = 'mongo_db';

  const MONGO_URI = `mongodb://${password}:${username}@${mongo_container_name}:${port}/${db_name}?authSource=admin`;
  const MONGO_URI_TEST = `mongodb://${password}:${username}@localhost:${port}/${testDbName}?authSource=admin`;

  const mongodb = test ? MONGO_URI_TEST : MONGO_URI;

  console.log(mongodb);

  try {
    await mongoose.connect(mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database');
  } catch (error) {
    console.error('database connection error:', error);
    process.exit(1);
  }
};

const databaseDrop = async () => {
  if (mongoose.connection.readyState) {
    console.log(`deleting database: ${testDbName}`);
    await mongoose.connection.dropDatabase();
  }
};

export { databaseInit, databaseDrop };

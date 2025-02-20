const mongoose = require('mongoose');

const env = {
  MONGO_URI:
    process.env.NODE_ENV === 'test'
      ? 'mongodb://admin:secret@localhost:27017/app-tests?authSource=admin'
      : 'mongodb://admin:secret@mongo_db:27017/oz-tech-test?authSource=admin',
};
const databaseInit = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database');
  } catch (error) {
    console.error('database connection error:', error);
    process.exit(1);
  }
};

export default databaseInit;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/isep_batch1_archive';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`[Database] MongoDB Connected successfully to: ${mongoUri}`);
  } catch (error) {
    console.warn(`[Database] Warning: MongoDB connection error (${error.message}). Running in mock/standalone mode.`);
  }
};

module.exports = connectDB;

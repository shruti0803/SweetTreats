// src/config/db.ts

import mongoose from 'mongoose';
import config from './index';


const connectDB = async () => {
  try {
    // Mongoose uses the URI from the configuration
    await mongoose.connect(config.mongoURI);

    console.log('✅ MongoDB Atlas Connected successfully.');
  } catch (err) {
    // Cast the error to type Error for message access
    console.error(`❌ MongoDB Connection Error: ${(err as Error).message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
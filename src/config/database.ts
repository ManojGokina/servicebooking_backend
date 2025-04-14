import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Booking';
    await mongoose.connect(mongoUri);
    const db = mongoose.connection;
    logger.info('Connected to database successfully');
    logger.info(`Connected to database: ${mongoose.connection.name}`);

  } catch (error) {
    logger.error('MongoDB connection error:', error); 
    process.exit(1);
  }
};
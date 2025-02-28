import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/socialNetwork';






const db = async (): Promise<typeof mongoose.connection> =>{
  try {
      await mongoose.connect(MONGO_URI);
      console.log('Database connected.');
      return mongoose.connection;
  } catch(error) {
      console.error('Database connection error:', error);
      throw new Error('Database connection failed.');
  }
}

export default db;

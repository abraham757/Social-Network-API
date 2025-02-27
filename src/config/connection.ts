import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/socialNetwork';




  mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB conected'))
  .catch((err) => console.error('❌ Connection error:', err));

export default mongoose.connection;
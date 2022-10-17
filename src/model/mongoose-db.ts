import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
const dotenvPath = path.join(__dirname, '../', `config/.env`);
dotenv.config({
  path: dotenvPath,
});

const uri: string = process.env.DB_URL || '';

export default mongoose.connect(uri, {
  dbName: process.env.DB_NAME,
  useUnifiedTopology: true,
  useNewUrlParser: true,
} as ConnectOptions);

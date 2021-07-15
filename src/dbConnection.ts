import { createConnection, Connection } from 'typeorm';
import { User } from './entity/User';
import { Note } from './entity/Note';
import 'reflect-metadata';
require('dotenv').config();

const connectDB = async () => {
  const dbConnection = await createConnection({
    // below inserting
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: 5432,
    entities: [User, Note],
  });

  return dbConnection;
};

const dbConnection = connectDB();

export default dbConnection;

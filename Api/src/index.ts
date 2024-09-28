import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import cors from './app/middlewares/cors';
import { env } from './env';

const {DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, PORT} = env;

const mongoConnectionUrl = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

mongoose.set('strictQuery', false);

mongoose.connect(mongoConnectionUrl)
  .then(() => {
    const app = express();

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(cors);
    app.use(router);

    app.listen(PORT, () => console.log(`🔥 Server running on http://localhost:${PORT}`));
  })
  .catch(() => console.log('Error to make connection with Database'));

import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import { CorsMiddleware } from './app/middlewares/CorsMiddleware';
import { env } from './env';

const {
  DB_HOST: host,
  DB_NAME: name,
  DB_PASS: pass,
  DB_PORT: port,
  DB_USER: user,
  PORT,
} = env;

const mongoConnectionUrl = `mongodb://${user}:${pass}@${host}:${port}/${name}?authSource=admin`;

mongoose.set('strictQuery', false);

mongoose.connect(mongoConnectionUrl)
  .then(() => {
    const app = express();

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(CorsMiddleware);
    app.use(router);

    app.listen(PORT, () => console.log(`🔥 Server running on http://localhost:${PORT}`));
  })
  .catch(() => console.log('Error to make connection with Database'));

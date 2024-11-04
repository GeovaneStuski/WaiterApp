import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import http from 'node:http';
import { router } from './router';
import CorsMiddleware from './app/middlewares/CorsMiddleware';
import { env } from './env';
import { User } from './app/models/User';
import { Server } from 'socket.io';

const {
  DB_HOST: host,
  DB_NAME: name,
  DB_PASS: pass,
  DB_PORT: port,
  DB_USER: user,
  PORT,
} = env;

const app = express();

const server = http.createServer(app);

export const io = new Server(server);

const mongoConnectionUrl = `mongodb://${user}:${pass}@${host}:${port}/${name}?authSource=admin`;

mongoose.set('strictQuery', false);

mongoose.connect(mongoConnectionUrl)
  .then(() => {
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(CorsMiddleware);
    app.use(router);

    server.listen(PORT, () => console.log(`🔥 Server running on http://localhost:${PORT}`));

    (async function createAdminUser() {
      const response = await User.find();

      if(response.length < 1) {
        User.create({
          email: 'admin@admin.com',
          name: 'AdminUser',
          password: 'admin',
          position: 'admin',
        });
      }
    })();
  })
  .catch(() => console.log('Error to make connection with Database'));

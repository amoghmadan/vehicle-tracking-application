import { Server } from 'http';

import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { authenticate } from '../middlewares';
import urlpatterns from '../routes';
import { MONGO_URI } from '../settings';

export default async function bootstrap(port, host) {
  const app = express();
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan('combined'));
  app.use(authenticate);

  urlpatterns.forEach((router, pattern) => {
    app.use(pattern, router);
  });

  const serverOptions = {};
  const server = new Server(serverOptions, app);

  await mongoose.connect(MONGO_URI);
  server.listen(port, host, () => {
    console.log(server.address());
  });
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
import path, { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(express()),
  );

  // Enable CORS for all routes
  app.use(cors());
  const path = require('path');
  const publicPath = path.resolve(__dirname, '../public');
  app.use('/public', express.static(publicPath));
  const port = 3001;
  await app.listen(port);

  console.log(`Nest.js server is running on http://localhost:${port}`);
}
bootstrap();

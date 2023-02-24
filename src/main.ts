import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as expressHbs from 'express-handlebars';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.engine(
    'hbs',
    expressHbs.engine({
      layoutsDir: join(__dirname, 'views/layouts'),
      partialsDir: join(__dirname, 'views/partials'),
      defaultLayout: 'index',
      extname: 'hbs',
    }),
  );
  app.setViewEngine('hbs');
}
bootstrap();

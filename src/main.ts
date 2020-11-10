import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Compression
  if (process.env.COMPRESSION_ENABLE === '1') {
    app.use(compression());
  }

  // Cors
  if (process.env.CORS_ENABLE === '1') {
    app.enableCors();
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

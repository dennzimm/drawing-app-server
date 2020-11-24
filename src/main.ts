import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app/app.module';

/**
 * The main.ts includes an async function, which will bootstrap the application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * The ValidationPipe makes use of the powerful class-validator package
   * and its declarative validation decorators. The ValidationPipe provides
   * a convenient approach to enforce validation rules for all incoming client
   * payloads, where the specific rules are declared with simple annotations
   * in local class/DTO declarations in each module.
   *
   * (see https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe)
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Compression Middleware Package
   *
   * Use the compression middleware package to enable gzip compression.
   * Compression can greatly decrease the size of the response body,
   * thereby increasing the speed of a web app.
   *
   * (see https://docs.nestjs.com/techniques/compression#compression)
   */
  if (process.env.COMPRESSION_ENABLE === '1') {
    app.use(compression());
  }

  /**
   * Cors
   *
   * Cross-origin resource sharing (CORS) is a mechanism that allows resources
   * to be requested from another domain. Under the hood, Nest makes use of
   * the Express cors package. This package provides various options that you
   * can customize based on your requirements.
   *
   * (see https://docs.nestjs.com/security/cors#cors)
   */
  if (process.env.CORS_ENABLE === '1') {
    app.enableCors();
  }

  /**
   * Starts the application.
   */
  await app.listen(process.env.PORT || 3000);
}

bootstrap();

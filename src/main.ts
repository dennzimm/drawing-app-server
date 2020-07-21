import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';

const logger = new Logger('App');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(compression());
  app.enableCors();

  await app.listen(configService.get('port'));

  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

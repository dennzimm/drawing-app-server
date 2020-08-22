import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';
import { PubSub } from 'apollo-server-express';
import { ConfigService } from '@nestjs/config';

export const PubSubProvider = {
  ...(process.env.REDIS_ENABLED === '0' && {
    provide: 'PUB_SUB',
    useValue: new PubSub(),
  }),
  ...(process.env.REDIS_ENABLED === '1' && {
    inject: [ConfigService],
    provide: 'PUB_SUB',
    useFactory: (configService: ConfigService) => {
      const REDIS_URL = configService.get('REDIS_URL');

      // const options = {
      //   host: configService.get('REDIS_HOST'),
      //   port: configService.get('REDIS_PORT'),
      // };

      return new RedisPubSub({
        publisher: new Redis(REDIS_URL),
        subscriber: new Redis(REDIS_URL),
      });
    },
  }),
};

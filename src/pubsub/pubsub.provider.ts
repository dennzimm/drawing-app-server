import { ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';

export const PubSubProvider = {
  // {
  //   provide: 'PUB_SUB',
  //   useValue: new PubSub(),
  // }
  inject: [ConfigService],
  provide: 'PUB_SUB',
  useFactory: (configService: ConfigService) => {
    const REDIS_URL = configService.get('REDIS_URL');

    return new RedisPubSub({
      publisher: new Redis(REDIS_URL),
      subscriber: new Redis(REDIS_URL),
    });
  },
};

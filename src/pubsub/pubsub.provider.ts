// import { RedisPubSub } from 'graphql-redis-subscriptions';
// import * as Redis from 'ioredis';
import { PubSub } from 'apollo-server-express';

export const PubSubProvider = {
  provide: 'PUB_SUB',
  useValue: new PubSub(),
};

// export default {
//   inject: [ConfigService],
//   provide: 'PUB_SUB',
//   useFactory: (configService: ConfigService) => {
//     const options = {
//       host: configService.get('REDIS_HOST'),
//       port: configService.get('REDIS_PORT'),
//     };

//     return new RedisPubSub({
//       publisher: new Redis(options),
//       subscriber: new Redis(options),
//     });
//   },
// },

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigService } from '@nestjs/config';
import { PubSub } from 'apollo-server-express';
// import { RedisPubSub } from 'graphql-redis-subscriptions';
// import * as Redis from 'ioredis';
import Drawing from './entities/drawing.entity';
import Item from './entities/item.entity';
import { resolvers } from './resolvers';
import { services } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Drawing, Item])],
  controllers: [],
  providers: [
    // {
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
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    ...services,
    ...resolvers,
  ],
})
export class DrawingsModule {}

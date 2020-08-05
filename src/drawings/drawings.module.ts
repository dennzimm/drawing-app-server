import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';
import Drawing from './entities/drawing.entity';
import Item from './entities/item.entity';
import { resolvers } from './resolvers';
import { services } from './services';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Drawing, Item])],
  controllers: [],
  providers: [
    {
      inject: [ConfigService],
      provide: 'PUB_SUB',
      useFactory: (configService: ConfigService) => {
        const options = {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        };

        return new RedisPubSub({
          publisher: new Redis(options),
          subscriber: new Redis(options),
        });
      },
    },
    ...services,
    ...resolvers,
  ],
})
export class DrawingsModule {}

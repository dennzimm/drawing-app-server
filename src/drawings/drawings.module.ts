import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSub } from 'apollo-server-express';
import Drawing from './entities/drawing.entity';
import Item from './entities/item.entity';
import { resolvers } from './resolvers';
import { services } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Drawing, Item])],
  controllers: [],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    ...services,
    ...resolvers,
  ],
})
export class DrawingsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PubSub } from 'apollo-server-express';
import { helpers } from './helpers';
import { resolvers } from './resolvers';
import { Drawing, DrawingSchema } from './schemas/drawing.schema';
import { Item, ItemSchema } from './schemas/item.schema';
import { services } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Drawing.name, schema: DrawingSchema },
      { name: Item.name, schema: ItemSchema },
    ]),
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    ...helpers,
    ...resolvers,
    ...services,
  ],
})
export class DrawingsModule {}

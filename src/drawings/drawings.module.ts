import { Module } from '@nestjs/common';
import { PubSub } from 'apollo-server-express';
import { helper } from './common/helper';
import { resolvers } from './resolvers';
import { scalars } from './scalars';
import { services } from './services';

@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    ...helper,
    ...scalars,
    ...services,
    ...resolvers,
  ],
})
export class DrawingsModule {}

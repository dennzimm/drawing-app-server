import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { helpers } from './helpers';
import { providers } from './providers';
import { resolvers } from './resolvers';
import { mongooseModuleSchemas } from './schemas';
import { services } from './services';

@Module({
  imports: [MongooseModule.forFeature(mongooseModuleSchemas)],
  providers: [...helpers, ...providers, ...resolvers, ...services],
})
export class DrawingsModule {}

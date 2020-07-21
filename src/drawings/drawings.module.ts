import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { helpers } from './helpers';
import { providers } from './providers';
import { resolvers } from './resolvers';
import { services } from './services';
import { mongooseModuleSchemas } from './schemas';

@Module({
  imports: [MongooseModule.forFeature(mongooseModuleSchemas)],
  providers: [...helpers, ...providers, ...resolvers, ...services],
})
export class DrawingsModule {}

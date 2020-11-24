import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DrawingsModule } from '../drawings/drawings.module';
import { GraphqlModule } from '../graphql/graphql.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PubSubModule } from '../pubsub/pubsub.module';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

/**
 * The AppModule or "root module" is the starting point Nest uses to build
 * the application graph - the internal data structure Nest uses to resolve
 * module and provider relationships and dependencies.
 *
 * Within this module all other modules, services or providers are imported.
 *
 * (see https://docs.nestjs.com/modules)
 *
 * @export
 * @class AppModule
 */
@Module({
  imports: [
    ConfigModule,
    GraphqlModule,
    PubSubModule,
    PrismaModule,
    DrawingsModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}

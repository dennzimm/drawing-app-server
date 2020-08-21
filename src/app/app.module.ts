import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DrawingsModule } from '../drawings/drawings.module';
import { GraphqlModule } from '../graphql/graphql.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PubSubModule } from '../pubsub/pubsub.module';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

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

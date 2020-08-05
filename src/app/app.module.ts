import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { DrawingsModule } from '../drawings/drawings.module';
import { GraphqlModule } from '../graphql/graphql.module';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule, GraphqlModule, DatabaseModule, DrawingsModule],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}

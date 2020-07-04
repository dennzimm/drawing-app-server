import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DrawingsModule } from './drawings/drawings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      debug: process.env.NODE_ENV === 'development',
      playground: true,
    }),
    DrawingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

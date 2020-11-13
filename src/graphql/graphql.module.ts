import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

/**
 * The GraphQLModule is a wrapper around the Apollo server.
 * We use this proven GraphQL package to provide a way to use GraphQL with Nest.
 *
 * (https://docs.nestjs.com/graphql/quick-start)
 */
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        context: ({ req }) => ({ req }),
        installSubscriptionHandlers: true,
        autoSchemaFile:
          configService.get('GRAPHQL_SCHEMA_DEST') || './src/schema.graphql',
        debug: configService.get('GRAPHQL_DEBUG') === '1' ? true : false,
        playground:
          configService.get('PLAYGROUND_ENABLE') === '1' ? true : false,
        introspection:
          configService.get('INTROSPECTION_ENABLE') === '1' ? true : false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class GraphqlModule {}

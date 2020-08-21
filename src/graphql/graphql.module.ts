import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

interface ConnectionParams extends Object {
  userID: string;
  drawingID: string;
}

// const clients = new Map<any, ConnectionParams>();

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
        // subscriptions: {
        //   onConnect: (connectionParams: ConnectionParams, websocket) => {
        //     const { userID, drawingID } = connectionParams;

        //     if (!userID || !drawingID) {
        //       throw new ForbiddenException(
        //         'userID and drawingID must be supplied as connectionParams',
        //       );
        //     }

        //     clients.set(websocket, {
        //       userID,
        //       drawingID,
        //     });
        //   },
        //   onDisconnect: websocket => {
        //     clients.delete(websocket);
        //   },
        // },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class GraphqlModule {}

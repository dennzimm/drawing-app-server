import { ForbiddenException, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

interface ConnectionParams extends Object {
  userID: string;
  drawingID: string;
}

const clients = new Map<any, ConnectionParams>();

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        onConnect: (connectionParams: ConnectionParams, websocket, context) => {
          const { userID, drawingID } = connectionParams;

          if (!userID || !drawingID) {
            throw new ForbiddenException(
              'userID and drawingID must be supplied as connectionParams',
            );
          }

          clients.set(websocket, {
            userID,
            drawingID,
          });

          console.log(`user ${userID} connected to drawing ${drawingID}`);
        },
        onDisconnect: (websocket, context) => {
          const { userID, drawingID } = clients.get(websocket);
          console.log(`user ${userID} disconnected from drawing ${drawingID}`);
          clients.delete(websocket);
        },
      },
    }),
  ],
})
export class GraphqlModule {}

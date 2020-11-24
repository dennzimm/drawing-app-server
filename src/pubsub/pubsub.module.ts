import { Global, Module } from '@nestjs/common';
import { PubSubProvider } from './pubsub.provider';

/**
 * The PubSubModule is used to configure the PubSubProvider which provides the PubSub-API.
 * Via this API, the AsyncIterator interface can be used to connect to the Subscription Manager,
 * which is required for the implementation of subscriptions.
 *
 * The PubSub implementation also includes a mechanism that converts a specific PubSub event
 * into a stream of AsyncIterator, which you can use with graphql subscriptions resolver.
 *
 * (https://www.apollographql.com/docs/graphql-subscriptions/setup/)
 *
 * @export
 * @class PubSubModule
 */
@Global()
@Module({
  providers: [PubSubProvider],
  exports: [PubSubProvider],
})
export class PubSubModule {}

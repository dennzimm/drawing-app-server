import { ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';

/**
 * This is where the PubSubProvider is configured.
 *
 * PubSub is a class that exposes a simple publish and subscribe API.
 * It sits between the application's logic and the GraphQL subscriptions engine -
 * it receives a publish command from your app logic and pushes it to your GraphQL execution engine.
 *
 * The PubSub implementation also includes a mechanism that converts a specific PubSub event
 * into a stream of AsyncIterator, which you can use with graphql subscriptions resolver.
 *
 * The 'graphql-redis-subscriptions'-package implements the PubSubEngine Interface from the
 * graphql-subscriptions package and also the new AsyncIterator interface.
 * It allows to connect the subscriptions manager to a Redis Pub Sub mechanism to support multiple
 * subscription manager instances.
 *
 * The main idea of a provider is that it can inject dependencies.
 * This means objects can create various relationships with each other,
 * and the function of "wiring up" instances of objects can largely be
 * delegated to the Nest runtime system.
 *
 * (see https://docs.nestjs.com/providers)
 * (see https://www.apollographql.com/docs/graphql-subscriptions/setup/)
 * (see https://github.com/davidyaha/graphql-redis-subscriptions)
 *
 * @export
 */
export const PubSubProvider = {
  inject: [ConfigService],
  provide: 'PUB_SUB',
  useFactory: (configService: ConfigService) => {
    const REDIS_URL = configService.get('REDIS_URL');

    return new RedisPubSub({
      publisher: new Redis(REDIS_URL),
      subscriber: new Redis(REDIS_URL),
    });
  },
};

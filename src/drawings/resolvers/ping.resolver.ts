import { Inject } from '@nestjs/common';
import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';

@Resolver('Ping')
export class PingResolver {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

  @Query(returns => String)
  ping(): string {
    const ping = new Date().getTime().toString();
    this.pubSub.publish('pinged', {
      pinged: ping,
    });
    return ping;
  }

  @Subscription(returns => String)
  pinged(): AsyncIterator<string> {
    return this.pubSub.asyncIterator('pinged');
  }
}

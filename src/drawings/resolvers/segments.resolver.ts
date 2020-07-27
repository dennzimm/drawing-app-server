import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { SegmentObjectType } from '../models/segment.model';
import { ItemsSubscriptionsType } from './items.resolver';

@Resolver((of) => SegmentObjectType)
export class SegmentsResolver {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

  @Mutation((returns) => SegmentObjectType)
  publishNewSegment(
    @Args('newSegmentData') newSegmentData: SegmentObjectType,
  ): SegmentObjectType {
    this.pubSub.publish(ItemsSubscriptionsType.ITEM_DATA_PUBLISHED, {
      [ItemsSubscriptionsType.ITEM_DATA_PUBLISHED]: newSegmentData,
    });

    return newSegmentData;
  }
}

import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { Segment } from '../models/segment.model';

export enum SegmentSubscriptionsType {
  NEW_SEGMENT_PUBLISHED = 'newSegmentPublished',
}

@Resolver(of => Segment)
export class SegmentsResolver {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

  @Mutation(returns => Segment)
  publishNewSegment(@Args('newSegmentData') newSegmentData: Segment): Segment {
    this.pubSub.publish(SegmentSubscriptionsType.NEW_SEGMENT_PUBLISHED, {
      [SegmentSubscriptionsType.NEW_SEGMENT_PUBLISHED]: newSegmentData,
    });

    return newSegmentData;
  }

  @Subscription(returns => Segment)
  newSegmentPublished(): AsyncIterator<PubSubEngine, Segment> {
    return this.pubSub.asyncIterator(
      SegmentSubscriptionsType.NEW_SEGMENT_PUBLISHED,
    );
  }
}

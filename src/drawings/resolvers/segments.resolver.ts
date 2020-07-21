import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { drawingFilter } from '../common/filters/drawing.filter';
import { userFilter } from '../common/filters/user.filter';
import { withFilters } from '../common/filters/with-filters';
import { NewSegmentPublishedArgs } from '../dto/args/new-segment-published.args';
import { Segment } from '../models/segment.model';

export enum SegmentSubscriptionsType {
  NEW_SEGMENT_PUBLISHED = 'newSegmentPublished',
}

@Resolver((of) => Segment)
export class SegmentsResolver {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

  @Mutation((returns) => Segment)
  publishNewSegment(@Args('newSegmentData') newSegmentData: Segment): Segment {
    this.pubSub.publish(SegmentSubscriptionsType.NEW_SEGMENT_PUBLISHED, {
      [SegmentSubscriptionsType.NEW_SEGMENT_PUBLISHED]: newSegmentData,
    });

    return newSegmentData;
  }

  @Subscription((returns) => Segment, {
    filter: (
      payload: Record<'newSegmentPublished', Segment>,
      variables: NewSegmentPublishedArgs,
    ) =>
      withFilters({
        payload,
        variables,
        key: 'newSegmentPublished',
        filters: [userFilter, drawingFilter],
      }),
  })
  newSegmentPublished(
    @Args()
    newSegmentPublishedArgs: NewSegmentPublishedArgs,
  ): AsyncIterator<PubSubEngine, Segment> {
    return this.pubSub.asyncIterator(
      SegmentSubscriptionsType.NEW_SEGMENT_PUBLISHED,
    );
  }
}

import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { Segment } from '../models/segment.model';
import { SegmentsService } from '../services/segments.service';

@Resolver(of => Segment)
export class SegmentsResolver {
  private logger = new Logger(SegmentsResolver.name);

  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private readonly segmentsService: SegmentsService,
  ) {}

  @Mutation(returns => Segment)
  async addSegment(
    @Args('addSegmentInput') addSegmentInput: Segment,
  ): Promise<Segment> {
    const newSegmentData = await this.segmentsService.addSegment(
      addSegmentInput,
    );

    this.pubSub.publish('newSegmentData', {
      newSegmentData,
    });

    return newSegmentData;
  }

  @Subscription(returns => Segment)
  newSegmentData(): AsyncIterator<Segment> {
    return this.pubSub.asyncIterator('newSegmentData');
  }
}

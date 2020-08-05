import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Segment } from '../models/segment.model';
import { SegmentsService } from '../services/segments.service';

@Resolver(of => Segment)
export class SegmentsResolver {
  constructor(private segmentsService: SegmentsService) {}

  @Mutation(returns => Segment)
  publishNewSegment(@Args('newSegmentData') newSegmentData: Segment): Segment {
    const { drawingID, userID, ...newSegment } = newSegmentData;

    this.segmentsService.publishNewSegment({
      payload: {
        node: newSegment,
        variables: {
          drawingID,
          userID,
        },
      },
    });

    return newSegmentData;
  }
}

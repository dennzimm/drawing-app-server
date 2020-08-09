import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PathObjectType as Path } from '../models/path.model';
import {
  SegmentInput,
  SegmentObjectType as Segment,
} from '../models/segment.model';
import { PathsService } from '../services/paths.service';

@Resolver((of) => Path)
export class PathsResolver {
  constructor(private pathsService: PathsService) {}

  @Mutation((returns) => Segment)
  async addSegment(@Args('segmentData') segmentData: SegmentInput) {
    const { drawingID, userID, ...segment } = segmentData;

    this.pathsService.publishSegmentAdded({
      payload: {
        node: segment,
        variables: {
          drawingID,
          userID,
        },
      },
    });

    return segment;
  }
}

import { createUnionType } from '@nestjs/graphql';
import { NewSegmentPayload } from '../dto/segment/segment.dto';

export const PublishedDrawingDataUnion = createUnionType({
  name: 'PublishedDrawingData',
  types: () => [NewSegmentPayload],
  resolveType(value: NewSegmentPayload) {
    if (value.node.segmentData) {
      return NewSegmentPayload;
    }

    return null;
  },
});

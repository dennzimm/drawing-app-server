import { createUnionType } from '@nestjs/graphql';
import { SegmentAddedPayload } from '../dto/path/path.dto';

export const PublishedDrawingDataUnion = createUnionType({
  name: 'PublishedDrawingData',
  types: () => [SegmentAddedPayload],
  resolveType(value: SegmentAddedPayload) {
    if (value.node.point) {
      return SegmentAddedPayload;
    }

    return null;
  },
});

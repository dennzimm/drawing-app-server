import { createUnionType } from '@nestjs/graphql';
import { PathObjectType, ShapeObjectType } from '../models/item.model';
import { SegmentObjectType } from '../models/segment.model';

export const ItemUnion = createUnionType({
  name: 'Item',
  types: () => [PathObjectType, ShapeObjectType],
  resolveType(value) {
    if (value.segments) {
      return PathObjectType;
    }

    if (value.radius) {
      return ShapeObjectType;
    }

    return null;
  },
});

export const PublishedItemDataUnion = createUnionType({
  name: 'PublishedItemData',
  types: () => [SegmentObjectType],
  resolveType(value) {
    if (value.segmentData) {
      return SegmentObjectType;
    }

    return null;
  },
});

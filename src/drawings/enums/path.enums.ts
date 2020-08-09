import { registerEnumType } from '@nestjs/graphql';

export enum PathMutationType {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
  SEGMENT_ADDED = 'segmentAdded',
}

registerEnumType(PathMutationType, {
  name: 'PathMutationType',
});

export enum StrokeJoinType {
  MITER = 'miter',
  ROUND = 'round',
  BEVEL = 'bevel',
}

export enum StrokeCapType {
  ROUND = 'round',
  SQUARE = 'square',
  BUTT = 'butt',
}

import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { PointObjectType as Point } from './point.model';

@InputType('SegmentInput')
@ObjectType('Segment')
export class SegmentObjectType {
  @Field((type) => Point)
  point: Point;
}

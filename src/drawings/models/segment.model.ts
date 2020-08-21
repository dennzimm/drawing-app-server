import { InputType, ObjectType } from '@nestjs/graphql';
import { Point } from './point.model';

@InputType('SegmentInput')
@ObjectType()
export class Segment {
  point: Point;
}

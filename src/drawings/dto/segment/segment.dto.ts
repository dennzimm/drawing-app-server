import { Field, ObjectType } from '@nestjs/graphql';
import { Segment } from '../../models/segment.model';

@ObjectType('NewSegment')
export class NewSegmentPayload {
  @Field((type) => Segment)
  node: Segment;
}

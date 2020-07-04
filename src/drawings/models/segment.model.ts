import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaperSegmentData } from '../interfaces/paper-segment.interface';
import { PaperSegmentScalar as PaperSegment } from '../scalars/paper-segment.scalar';

@InputType('SegmentInput')
@ObjectType()
export class Segment {
  userID: string;
  drawingID: string;
  itemID: string;
  segmentID: string;

  @Field(type => PaperSegment)
  data: PaperSegmentData;
}

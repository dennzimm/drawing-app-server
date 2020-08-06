import { Field, Float, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonDrawingInput } from '../common/dto/common-drawing.dto';

@InputType('SegmentDataInput')
@ObjectType()
export class SegmentData {
  @Field((type) => Float)
  x: number;

  @Field((type) => Float)
  y: number;
}

@InputType('NewSegmentInput')
@ObjectType()
export class Segment extends CommonDrawingInput {
  @Field((type) => ID)
  itemID: string;

  @Field((type) => SegmentData)
  segmentData: SegmentData;

  @Field((type) => String, { nullable: true })
  strokeColor?: string;

  @Field((type) => String, { nullable: true })
  fillColor?: string;

  @Field((type) => Float, { nullable: true })
  strokeWidth?: number;
}

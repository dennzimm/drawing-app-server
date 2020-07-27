import { Field, Float, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('SegmentDataInput')
@ObjectType('SegmentData')
export class SegmentDataObjectType {
  @Field((type) => Float)
  x: number;

  @Field((type) => Float)
  y: number;
}

@InputType('NewSegmentInput')
@ObjectType('Segment')
export class SegmentObjectType {
  @Field((type) => ID)
  userID: string;

  @Field((type) => ID)
  drawingID: string;

  @Field((type) => ID)
  itemID: string;

  @Field((type) => SegmentDataObjectType)
  segmentData: SegmentDataObjectType;

  @Field((type) => String, { nullable: true })
  strokeColor?: string;

  @Field((type) => [Float], { nullable: true })
  fillColor?: number[];

  @Field((type) => Int, { nullable: true })
  strokeWidth?: number;
}

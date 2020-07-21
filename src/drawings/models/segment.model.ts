import { Field, Float, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('NewSegmentInput')
@ObjectType()
export class Segment {
  @Field((type) => ID)
  userID: string;

  @Field((type) => ID)
  drawingID: string;

  @Field((type) => ID)
  itemID: string;

  @Field((type) => String)
  segmentData: string;

  @Field((type) => [Float], { nullable: true })
  strokeColor?: number[];

  @Field((type) => [Float], { nullable: true })
  fillColor?: number[];

  @Field((type) => [Int], { nullable: true })
  strokeWidth?: number;
}

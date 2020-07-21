import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('NewSegmentInput')
@ObjectType()
export class Segment {
  @Field(type => String)
  drawing: string;

  @Field(type => String)
  name: string;

  @Field(type => String)
  data: string;
}

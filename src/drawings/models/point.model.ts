import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';

@InputType('PointInput')
@ObjectType()
export class Point {
  @Field(type => Float)
  x: number;

  @Field(type => Float)
  y: number;
}

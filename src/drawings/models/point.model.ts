import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';

@InputType('PointInput')
@ObjectType('Point')
export class PointObjectType {
  @Field((type) => Float)
  x: number;

  @Field((type) => Float)
  y: number;
}

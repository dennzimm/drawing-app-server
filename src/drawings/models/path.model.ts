import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';

@InputType('PathInput')
@ObjectType()
export class Path {
  @Field(type => Float)
  strokeWidth: number;

  strokeColor?: string;

  fillColor?: string;

  strokeJoin?: string;

  strokeCap?: string;

  blendMode?: string;
}

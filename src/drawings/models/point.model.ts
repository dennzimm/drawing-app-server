import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType('PointInput')
@ObjectType()
export class Point {
  @Field(type => Float)
  x: number;

  @Field(type => Float)
  y: number;

  @IsOptional()
  @Field(type => Float)
  angle?: number;

  @IsOptional()
  @Field(type => Float)
  angleInRadians?: number;

  @IsOptional()
  @Field(type => Float)
  length?: number;

  @IsOptional()
  @Field(type => Float)
  quadrant?: number;
}

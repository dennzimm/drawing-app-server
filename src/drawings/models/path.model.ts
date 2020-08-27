import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType('PathInput')
@ObjectType()
export class Path {
  @Field((type) => Float)
  strokeWidth: number;

  @IsOptional()
  strokeColor?: string;

  @IsOptional()
  fillColor?: string;

  @IsOptional()
  strokeJoin?: string;

  @IsOptional()
  strokeCap?: string;

  @IsOptional()
  blendMode?: string;

  @IsOptional()
  @Field((type) => Boolean, { defaultValue: false, nullable: true })
  closed?: boolean;
}

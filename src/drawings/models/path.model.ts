import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { StrokeCapType, StrokeJoinType } from '../enums/path.enums';

@InputType('PathInput')
@ObjectType('Path')
export class PathObjectType {
  @Field((type) => Float)
  strokeWidth: number;

  @Field((type) => String, { nullable: true })
  strokeColor?: string;

  @Field((type) => String, { nullable: true })
  fillColor?: string;

  @Field((type) => StrokeJoinType, {
    nullable: true,
    defaultValue: StrokeJoinType.MITER,
  })
  strokeJoin?: StrokeJoinType;

  @Field((type) => StrokeCapType, {
    nullable: true,
    defaultValue: StrokeCapType.BUTT,
  })
  strokeCap?: StrokeCapType;
}

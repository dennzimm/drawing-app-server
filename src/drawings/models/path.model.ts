import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';

@InputType('PathInput')
@ObjectType('Path')
export class PathObjectType {
  @Field((type) => Float)
  strokeWidth: number;

  @Field((type) => String, { nullable: true })
  strokeColor?: string;

  @Field((type) => String, { nullable: true })
  fillColor?: string;

  @Field((type) => String, {
    nullable: true,
    defaultValue: 'round',
  })
  strokeJoin?: string;

  @Field((type) => String, {
    nullable: true,
    defaultValue: 'round',
  })
  strokeCap?: string;
}

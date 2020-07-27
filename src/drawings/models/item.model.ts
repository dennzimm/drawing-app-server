import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ItemObjectType {
  @Field((type) => ID)
  itemID: string;

  @Field((type) => Boolean, { defaultValue: true })
  applyMatrix?: boolean;

  @Field((type) => [Float], { nullable: true })
  strokeColor?: number[];

  @Field((type) => [Float], { nullable: true })
  fillColor?: number[];

  @Field((type) => [Int], { nullable: true })
  strokeWidth: number;
}

@ObjectType('Path')
export class PathObjectType extends ItemObjectType {
  @Field((type) => [[[Float]]])
  segments: Array<Array<number[]>>;
}

@ObjectType('Shape')
export class ShapeObjectType extends ItemObjectType {
  @Field((type) => String)
  type: string;

  @Field((type) => [Float])
  size: number[];

  @Field((type) => [Float])
  radius: number[];

  @Field((type) => [Float])
  matrix: number[];
}

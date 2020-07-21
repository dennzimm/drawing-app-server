import {
  Field,
  ID,
  ObjectType,
  Float,
  Int,
  createUnionType,
} from '@nestjs/graphql';

@ObjectType()
export class Item {
  @Field(type => ID)
  id: string;

  @Field(type => Boolean)
  applyMatrix: boolean;

  @Field(type => [Float], { nullable: true })
  strokeColor?: number[];

  @Field(type => [Float], { nullable: true })
  fillColor?: number[];

  @Field(type => [Int], { nullable: true })
  strokeWidth?: number;
}

@ObjectType()
export class Path extends Item {
  @Field(type => [[[Float]]])
  segments: number[][][];
}

@ObjectType()
export class Shape extends Item {
  @Field(type => String)
  type: string;

  @Field(type => [Float])
  size: number[];

  @Field(type => [Float])
  radius: number[];

  @Field(type => [Float])
  matrix: number[];
}

export const ItemUnion = createUnionType({
  name: 'Item',
  types: () => [Path, Shape],
  resolveType(value) {
    if (value.segments) {
      return Path;
    }

    if (value.radius) {
      return Shape;
    }

    return null;
  },
});

import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class CommonItemArgs {
  @Field((type) => ID)
  layerID: string;

  @Field((type) => ID, { nullable: true })
  groupID?: string;

  @Field((type) => ID)
  itemID: string;
}

@InputType()
export class CommonItemInput {
  @Field((type) => ID)
  layerID: string;

  @Field((type) => ID, { nullable: true })
  groupID?: string;

  @Field((type) => ID)
  itemID: string;
}

@ObjectType()
export class CommonItemObjectType {
  @Field((type) => ID)
  layerID: string;

  @Field((type) => ID, { nullable: true })
  groupID?: string;

  @Field((type) => ID)
  itemID: string;
}

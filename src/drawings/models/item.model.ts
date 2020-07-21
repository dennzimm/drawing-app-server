import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Item {
  @Field((type) => ID)
  itemID: string;

  @Field((type) => String)
  itemData: string;
}

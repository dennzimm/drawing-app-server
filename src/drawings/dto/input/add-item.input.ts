import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class AddItemInput {
  @Field((type) => ID)
  userID: string;

  @Field((type) => ID)
  drawingID: string;

  @Field((type) => ID)
  itemID: string;

  @Field((type) => String)
  itemData: string;
}

import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class DeleteItemArgs {
  @Field((type) => ID)
  userID: string;

  @Field((type) => ID)
  drawingID: string;

  @Field((type) => ID)
  itemID: string;
}

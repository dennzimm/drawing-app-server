import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class DrawingArgs {
  @Field((type) => ID)
  userID: string;

  @Field((type) => ID)
  drawingID: string;
}

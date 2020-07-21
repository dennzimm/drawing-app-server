import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDrawingInput {
  @Field((type) => ID)
  userID: string;

  @Field((type) => String)
  drawingID: string;
}

import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';

@ArgsType()
export class CommonDrawingArgs {
  @Field(type => ID)
  userID: string;

  @Field(type => ID)
  drawingID: string;
}

@InputType()
export class CommonDrawingInput {
  @Field(type => ID)
  userID: string;

  @Field(type => ID)
  drawingID: string;
}

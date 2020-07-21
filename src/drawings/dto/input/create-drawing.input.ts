import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDrawingInput {
  @Field(type => String)
  name: string;
}

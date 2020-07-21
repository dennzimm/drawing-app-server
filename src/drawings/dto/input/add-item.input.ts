import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddItemInput {
  @Field(type => String)
  drawing: string;

  @Field(type => String)
  name: string;

  @Field(type => String)
  data: string;
}

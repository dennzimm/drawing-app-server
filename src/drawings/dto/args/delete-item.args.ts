import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DeleteItemArgs {
  @Field(type => String)
  drawing: string;

  @Field(type => String)
  name: string;
}

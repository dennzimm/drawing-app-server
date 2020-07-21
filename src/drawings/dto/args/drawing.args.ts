import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DrawingArgs {
  @Field(type => String)
  name: string;
}

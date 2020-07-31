import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class LoginUserArgs {
  @Field((type) => ID)
  username: string;

  password: string;
}

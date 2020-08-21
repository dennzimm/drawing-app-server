import { ObjectType } from '@nestjs/graphql';
import { Token } from '../users/token.model';
import { User } from '../users/user.model';

@ObjectType()
export class Auth extends Token {
  user: User;
}

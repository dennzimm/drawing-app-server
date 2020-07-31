import { HideField, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserObjectType {
  userId: string;

  username: string;

  @HideField()
  password: string;

  accessToken: string;
}

import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Item {
  @Field(type => ID)
  id: string;

  @Field(type => String)
  name: string;

  @Field(type => String)
  data: string;
}

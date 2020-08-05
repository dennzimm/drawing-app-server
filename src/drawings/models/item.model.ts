import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Item')
export class ItemObjectType {
  @Field(type => ID)
  id: string;

  @Field(type => String)
  data: string;
}

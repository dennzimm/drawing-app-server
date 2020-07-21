import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Item } from './item.model';

@ObjectType()
export class Drawing {
  @Field(type => ID)
  id: string;

  @Field(type => String)
  name: string;

  @Field(type => [Item], { defaultValue: [] })
  items: Item[];
}

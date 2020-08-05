import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ItemObjectType as Item } from './item.model';

@ObjectType('Drawing')
export class DrawingObjectType {
  @Field(type => ID)
  id: string;

  @Field(type => [Item], { defaultValue: [] })
  items: Item[];
}

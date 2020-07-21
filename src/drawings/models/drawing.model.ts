import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Item } from './item.model';

@ObjectType()
export class Drawing {
  @Field((type) => ID)
  drawingID: string;

  @Field((type) => [Item], { defaultValue: [] })
  items: Item[];
}

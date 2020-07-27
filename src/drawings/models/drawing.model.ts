import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ItemUnion as Item } from '../unions/item.union';

@ObjectType('Drawing')
export class DrawingObjectType {
  @Field((type) => ID)
  drawingID: string;

  @Field((type) => [Item], { defaultValue: [] })
  items: typeof Item[];
}

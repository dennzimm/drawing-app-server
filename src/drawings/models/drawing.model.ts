import { Field, ObjectType } from '@nestjs/graphql';
import { Item } from './item.model';
import { Model } from './abstract/model.model';

@ObjectType('Drawing')
export class Drawing extends Model {
  name: string;

  @Field((type) => [Item], { nullable: 'items' })
  items: Item[];
}

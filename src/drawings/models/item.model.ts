import { ObjectType, registerEnumType } from '@nestjs/graphql';
import { Model } from './abstract/model.model';

export enum ItemType {
  LAYER = 'LAYER',
  GROUP = 'GROUP',
  PATH = 'PATH',
}

registerEnumType(ItemType, {
  name: 'ItemType',
  description: 'Paper Item Type (root level)',
});

@ObjectType()
export class Item extends Model {
  name: string;

  type: ItemType;

  data: string;
}

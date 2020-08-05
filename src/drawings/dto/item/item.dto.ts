import { Field, ObjectType } from '@nestjs/graphql';
import { MutationType } from '../../enums/mutation.enum';
import { ItemObjectType as Item } from '../../models/item.model';

@ObjectType()
export class ItemMutationPayload {
  @Field(type => MutationType)
  mutation: MutationType;

  @Field(type => Item)
  node: Item;
}

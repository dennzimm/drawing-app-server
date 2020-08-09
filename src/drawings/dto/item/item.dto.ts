import { Field, ObjectType } from '@nestjs/graphql';
import { MutationType } from '../../enums/mutation.enums';
import { ItemObjectType as Item } from '../../models/item.model';
import { MutationPayload } from '../../common/interfaces/mutation.interface';

@ObjectType('ItemMutation')
export class ItemMutationPayload implements MutationPayload<Item> {
  @Field((type) => MutationType)
  mutation: MutationType;

  @Field((type) => Item)
  node: Item;
}

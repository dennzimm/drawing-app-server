import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { drawingFilter } from '../common/filters/drawing.filter';
import { userFilter } from '../common/filters/user.filter';
import { withFilters } from '../common/filters/with-filters';
import { DeleteItemArgs, ItemMutatedArgs } from '../dto/item/item.args';
import { ItemMutationPayload } from '../dto/item/item.dto';
import { CreateItemInput } from '../dto/item/item.input';
import { ItemSubscriptionType } from '../enums/item.enums';
import { MutationType } from '../enums/mutation.enums';
import { ItemObjectType as Item } from '../models/item.model';
import { ItemsService } from '../services/items.service';

@Resolver((of) => Item)
export class ItemsResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private itemsService: ItemsService,
  ) {}

  @Mutation((returns) => Item)
  async createItem(
    @Args('createItemData') createItemData: CreateItemInput,
  ): Promise<Item> {
    const { drawingID, userID, ...itemData } = createItemData;
    const newItem = await this.itemsService.create({
      drawingID,
      itemData,
    });

    this.itemsService.publishItemMutation({
      mutation: MutationType.CREATED,
      payload: {
        node: newItem,
        variables: {
          drawingID,
          userID,
        },
      },
    });

    return newItem;
  }

  @Mutation((returns) => Item)
  async deleteItem(@Args() deleteItemArgs: DeleteItemArgs): Promise<Item> {
    const { drawingID, userID, itemID } = deleteItemArgs;
    const deletedItem = await this.itemsService.deleteOne({
      drawingID,
      itemID,
    });

    this.itemsService.publishItemMutation({
      mutation: MutationType.DELETED,
      payload: {
        node: deletedItem,
        variables: {
          drawingID,
          userID,
        },
      },
    });

    return deletedItem;
  }

  @Subscription((returns) => ItemMutationPayload, {
    filter: (
      payload: Record<ItemSubscriptionType.ITEM_MUTATED, ItemMutationPayload>,
      variables: ItemMutatedArgs,
    ) =>
      withFilters({
        payload,
        variables,
        key: ItemSubscriptionType.ITEM_MUTATED,
        filters: [userFilter, drawingFilter],
      }),
  })
  itemMutated(
    @Args() itemMutatedArgs: ItemMutatedArgs,
  ): AsyncIterator<PubSubEngine, ItemMutationPayload> {
    return this.pubSub.asyncIterator(ItemSubscriptionType.ITEM_MUTATED);
  }
}

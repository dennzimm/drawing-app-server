import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { drawingFilter } from '../common/filters/drawing.filter';
import { userFilter } from '../common/filters/user.filter';
import { withFilters } from '../common/filters/with-filters';
import { DeleteItemArgs } from '../dto/args/delete-item.args';
import { ItemAddedArgs } from '../dto/args/item-added.args';
import { ItemRemovedArgs } from '../dto/args/item-removed.args';
import { AddItemInput } from '../dto/input/add-item.input';
import { Item } from '../models/item.model';
import { ItemsService } from '../services/items.service';

export enum ItemsSubscriptionsType {
  ITEM_ADDED = 'itemAdded',
  ITEM_REMOVED = 'itemRemoved',
}

@Resolver((of) => Item)
export class ItemsResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private itemsService: ItemsService,
  ) {}

  @Mutation((returns) => Item)
  async addItem(@Args('addItemData') addItemData: AddItemInput): Promise<Item> {
    const addedItem = await this.itemsService.create(addItemData);

    this.pubSub.publish(ItemsSubscriptionsType.ITEM_ADDED, {
      [ItemsSubscriptionsType.ITEM_ADDED]: {
        ...addItemData,
        ...addedItem,
      },
    });

    return addedItem;
  }

  @Mutation((returns) => Item)
  async deleteItem(@Args() deleteItemArgs: DeleteItemArgs): Promise<Item> {
    const deletedItem = await this.itemsService.delete(deleteItemArgs);

    this.pubSub.publish(ItemsSubscriptionsType.ITEM_REMOVED, {
      [ItemsSubscriptionsType.ITEM_REMOVED]: {
        ...deleteItemArgs,
        ...deletedItem,
      },
    });

    return deletedItem;
  }

  @Subscription((returns) => Item, {
    filter: (
      payload: Record<'itemAdded', AddItemInput & Item>,
      variables: ItemAddedArgs,
    ) =>
      withFilters({
        payload,
        variables,
        key: 'itemAdded',
        filters: [userFilter, drawingFilter],
      }),
  })
  itemAdded(
    @Args() itemAddedArgs: ItemAddedArgs,
  ): AsyncIterator<PubSubEngine, ItemAddedArgs & Item> {
    return this.pubSub.asyncIterator(ItemsSubscriptionsType.ITEM_ADDED);
  }

  @Subscription((returns) => Item, {
    filter: (
      payload: Record<'itemRemoved', ItemRemovedArgs & Item>,
      variables: ItemRemovedArgs,
    ) =>
      withFilters({
        payload,
        variables,
        key: 'itemRemoved',
        filters: [userFilter, drawingFilter],
      }),
  })
  itemRemoved(
    @Args() itemRemovedArgs: ItemRemovedArgs,
  ): AsyncIterator<PubSubEngine, ItemRemovedArgs & Item> {
    return this.pubSub.asyncIterator(ItemsSubscriptionsType.ITEM_REMOVED);
  }
}

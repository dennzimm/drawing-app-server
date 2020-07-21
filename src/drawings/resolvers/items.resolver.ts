import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { DeleteItemArgs } from '../dto/args/delete-item.args';
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
    const addedItem = await this.itemsService.addToDrawing(addItemData);

    this.pubSub.publish(ItemsSubscriptionsType.ITEM_ADDED, {
      [ItemsSubscriptionsType.ITEM_ADDED]: addedItem,
    });

    return addedItem;
  }

  @Mutation((returns) => Item)
  async deleteItem(@Args() deleteItemArgs: DeleteItemArgs): Promise<Item> {
    const deletedItem = await this.itemsService.delete(deleteItemArgs);

    this.pubSub.publish(ItemsSubscriptionsType.ITEM_REMOVED, {
      [ItemsSubscriptionsType.ITEM_REMOVED]: deletedItem,
    });

    return deletedItem;
  }

  @Subscription((returns) => Item)
  itemAdded(): AsyncIterator<PubSubEngine, Item> {
    return this.pubSub.asyncIterator(ItemsSubscriptionsType.ITEM_ADDED);
  }

  @Subscription((returns) => Item)
  itemRemoved(): AsyncIterator<PubSubEngine, Item> {
    return this.pubSub.asyncIterator(ItemsSubscriptionsType.ITEM_REMOVED);
  }
}

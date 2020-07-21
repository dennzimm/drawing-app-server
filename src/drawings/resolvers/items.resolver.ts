import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { DeleteItemArgs } from '../dto/args/delete-item.args';
import { AddItemInput } from '../dto/input/add-item.input';
import { Item } from '../models/item.model';
import { ItemsService } from '../services/items.service';

export enum ItemsSubscriptionsType {
  ITEM_ADDED = 'itemAdded',
  ITEM_DELETED = 'itemDeleted',
}

@Resolver(of => Item)
export class ItemsResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private itemsService: ItemsService,
  ) {}

  @Mutation(returns => Item)
  async addItem(@Args('addItemData') addItemData: AddItemInput): Promise<Item> {
    const addedItemDoc = await this.itemsService.addToDrawing(addItemData);
    const addedItem = this.itemsService.itemReducer(addedItemDoc);

    this.pubSub.publish(ItemsSubscriptionsType.ITEM_ADDED, {
      [ItemsSubscriptionsType.ITEM_ADDED]: addedItem,
    });

    return addedItem;
  }

  @Mutation(returns => Item)
  async deleteItem(@Args() deleteItemArgs: DeleteItemArgs): Promise<Item> {
    const deletedItemDoc = await this.itemsService.delete(deleteItemArgs);
    const deletedItem = this.itemsService.itemReducer(deletedItemDoc);

    this.pubSub.publish(ItemsSubscriptionsType.ITEM_DELETED, {
      [ItemsSubscriptionsType.ITEM_DELETED]: deletedItem,
    });

    return deletedItem;
  }

  @Subscription(returns => Item)
  itemAdded(): AsyncIterator<PubSubEngine, Item> {
    return this.pubSub.asyncIterator(ItemsSubscriptionsType.ITEM_ADDED);
  }

  @Subscription(returns => Item)
  itemDeleted(): AsyncIterator<PubSubEngine, Item> {
    return this.pubSub.asyncIterator(ItemsSubscriptionsType.ITEM_DELETED);
  }
}

import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { Item } from '../models/item.model';
import { ItemsService } from '../services/items.service';

@Resolver(of => Item)
export class ItemsResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private readonly itemsService: ItemsService,
  ) {}

  @Mutation(returns => Item)
  async createItem(
    @Args('createItemInput') createItemInput: Item,
  ): Promise<Item> {
    const newItemData = await this.itemsService.create(createItemInput);

    this.pubSub.publish('newItemData', {
      newItemData,
    });

    return newItemData;
  }

  @Mutation(returns => Item)
  async updateItem(
    @Args('updateItemInput') updateItemInput: Item,
  ): Promise<Item> {
    const newItemData = await this.itemsService.update(updateItemInput);

    this.pubSub.publish('newItemData', {
      newItemData,
    });

    return newItemData;
  }

  @Subscription(returns => Item)
  newItemData(): AsyncIterator<Item> {
    return this.pubSub.asyncIterator('newItemData');
  }
}

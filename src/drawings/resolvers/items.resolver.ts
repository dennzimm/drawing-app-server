import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { CommonSubscriptionArgs } from '../common/dto/common-subscription.dto';
import { drawingFilter } from '../common/filters/drawing.filter';
import { userFilter } from '../common/filters/user.filter';
import { withFilters } from '../common/filters/with-filters';
import { DeleteItemArgs } from '../dto/args/delete-item.args';
import { AddItemInput } from '../dto/input/add-item.input';
import { ItemsService } from '../services/items.service';
import { ItemUnion, PublishedItemDataUnion } from '../unions/item.union';

export enum ItemsSubscriptionsType {
  ITEM_ADDED = 'itemAdded',
  ITEM_REMOVED = 'itemRemoved',
  ITEM_DATA_PUBLISHED = 'itemDataPublished',
}

@Resolver((of) => ItemUnion)
export class ItemsResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private itemsService: ItemsService,
  ) {}

  @Mutation((returns) => ItemUnion)
  async addItem(
    @Args('addItemData') addItemData: AddItemInput,
  ): Promise<typeof ItemUnion> {
    const addedItem = await this.itemsService.create(addItemData);

    this.pubSub.publish(ItemsSubscriptionsType.ITEM_ADDED, {
      [ItemsSubscriptionsType.ITEM_ADDED]: {
        ...addItemData,
        ...addedItem,
      },
    });

    return addedItem;
  }

  @Mutation((returns) => ItemUnion)
  async deleteItem(
    @Args() deleteItemArgs: DeleteItemArgs,
  ): Promise<typeof ItemUnion> {
    const deletedItem = await this.itemsService.delete(deleteItemArgs);

    this.pubSub.publish(ItemsSubscriptionsType.ITEM_REMOVED, {
      [ItemsSubscriptionsType.ITEM_REMOVED]: {
        ...deleteItemArgs,
        ...deletedItem,
      },
    });

    return deletedItem;
  }

  // TODO: Refactor Subscriptions with operation arg

  @Subscription((returns) => ItemUnion, {
    filter: (
      payload: Record<'itemAdded', AddItemInput & typeof ItemUnion>,
      variables: CommonSubscriptionArgs,
    ) =>
      withFilters({
        payload,
        variables,
        key: 'itemAdded',
        filters: [userFilter, drawingFilter],
      }),
  })
  itemAdded(
    @Args() itemAddedArgs: CommonSubscriptionArgs,
  ): AsyncIterator<PubSubEngine, CommonSubscriptionArgs & typeof ItemUnion> {
    return this.pubSub.asyncIterator(ItemsSubscriptionsType.ITEM_ADDED);
  }

  @Subscription((returns) => ItemUnion, {
    filter: (
      payload: Record<'itemRemoved', CommonSubscriptionArgs & typeof ItemUnion>,
      variables: CommonSubscriptionArgs,
    ) =>
      withFilters({
        payload,
        variables,
        key: 'itemRemoved',
        filters: [userFilter, drawingFilter],
      }),
  })
  itemRemoved(
    @Args() itemRemovedArgs: CommonSubscriptionArgs,
  ): AsyncIterator<PubSubEngine, CommonSubscriptionArgs & typeof ItemUnion> {
    return this.pubSub.asyncIterator(ItemsSubscriptionsType.ITEM_REMOVED);
  }

  // --------------------
  // --- Subscriptions
  // --------------------
  @Subscription((returns) => PublishedItemDataUnion, {
    filter: (
      payload: Record<'itemDataPublished', typeof PublishedItemDataUnion>,
      variables: CommonSubscriptionArgs,
    ) =>
      withFilters({
        payload,
        variables,
        key: 'itemDataPublished',
        filters: [userFilter, drawingFilter],
      }),
  })
  itemDataPublished(
    @Args() itemDataPublishedArgs: CommonSubscriptionArgs,
  ): AsyncIterator<PubSubEngine, typeof PublishedItemDataUnion> {
    return this.pubSub.asyncIterator(
      ItemsSubscriptionsType.ITEM_DATA_PUBLISHED,
    );
  }
}

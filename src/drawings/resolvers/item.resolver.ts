import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { MutationType } from '../common/enums/mutation.enum';
import { SubscriptionType } from '../common/enums/subscription.enum';
import { DrawingNameArgs } from '../dto/args/drawing-name.args';
import { UserIdArgs } from '../dto/args/user-id.args';
import { CreateItemInput } from '../dto/inputs/create-item.input';
import { DeleteItemInput } from '../dto/inputs/delete-item.input';
import { DrawingNameInput } from '../dto/inputs/drawing-name.input';
import { UserIdInput } from '../dto/inputs/user-id.input';
import { ItemMutatedArgs, ItemMutation } from '../dto/item-mutated.dto';
import { Item } from '../models/item.model';
import {
  ItemService,
  PublishItemMutationPayload,
} from '../services/item.service';

@Resolver(of => Item)
export class ItemResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private itemService: ItemService,
  ) {}

  @Mutation(returns => Item)
  async createItem(
    @Args('data') { name, type, data }: CreateItemInput,
    @Args('user') { userId }: UserIdInput,
    @Args('drawing') { drawingName }: DrawingNameInput,
  ) {
    const item = await this.itemService.createItem({
      drawing: {
        connect: {
          name: drawingName,
        },
      },
      name,
      type,
      data,
    });

    this.itemService.publishItemMutation({
      mutation: MutationType.CREATED,
      payload: {
        node: item,
        variables: {
          userId,
          drawingName,
        },
      },
    });

    return item;
  }

  @Mutation(returns => Item)
  async deleteItem(
    @Args('data')
    { name }: DeleteItemInput,
    @Args('user') { userId }: UserIdInput,
    @Args('drawing') { drawingName }: DrawingNameInput,
  ) {
    const deletedItem = await this.itemService.deleteItem({
      name,
    });

    this.itemService.publishItemMutation({
      mutation: MutationType.DELETED,
      payload: {
        node: deletedItem,
        variables: {
          userId,
          drawingName,
        },
      },
    });

    return deletedItem;
  }

  @Subscription(returns => ItemMutation, {
    filter: (
      { itemMutated }: PublishItemMutationPayload,
      { userId, drawingName }: ItemMutatedArgs,
    ) => {
      const isUser = itemMutated.variables.userId === userId;
      const isDrawing = itemMutated.variables.drawingName === drawingName;

      return !isUser && isDrawing;
    },
  })
  itemMutated(
    @Args() itemMutated: ItemMutatedArgs,
  ): AsyncIterator<PubSubEngine, UserIdArgs & DrawingNameArgs> {
    return this.pubSub.asyncIterator(SubscriptionType.ITEM_MUTATED);
  }
}

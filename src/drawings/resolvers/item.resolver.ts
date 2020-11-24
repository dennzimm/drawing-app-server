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

/**
 * The ItemResolver provides GraphQL operations for Items.
 * The business logic of this resolver is outsourced to the ItemService class.
 *
 * Resolvers provide the instructions for turning a GraphQL operation
 * (a query, mutation, or subscription) into data. They return the same
 * shape of data we specify in our schema -- either synchronously or as a
 * promise that resolves to a result of that shape.
 *
 * (see https://docs.nestjs.com/graphql/resolvers)
 *
 * @export
 * @class ItemResolver
 */
@Resolver((of) => Item)
export class ItemResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private itemService: ItemService,
  ) {}

  /**
   * {Mutation} Create an Item.
   *
   * @param {CreateItemInput} { name, type, data }
   * @param {UserIdInput} { userId }
   * @param {DrawingNameInput} { drawingName }
   * @return {*}
   * @memberof ItemResolver
   */
  @Mutation((returns) => Item, { nullable: true })
  async createItem(
    @Args('data') { name, type, data }: CreateItemInput,
    @Args('user') { userId }: UserIdInput,
    @Args('drawing') { drawingName }: DrawingNameInput,
  ) {
    try {
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
    } catch (err) {
      return null;
    }
  }

  /**
   * {Mutation} Delete an Item.
   *
   * @param {DeleteItemInput} { name }
   * @param {UserIdInput} { userId }
   * @param {DrawingNameInput} { drawingName }
   * @return {*}
   * @memberof ItemResolver
   */
  @Mutation((returns) => Item, { nullable: true })
  async deleteItem(
    @Args('data')
    { name }: DeleteItemInput,
    @Args('user') { userId }: UserIdInput,
    @Args('drawing') { drawingName }: DrawingNameInput,
  ) {
    try {
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
    } catch (err) {
      return null;
    }
  }

  /**
   * {Subscription} Subscribe to Item mutations.
   *
   * The following subscription handler takes care of subscribing
   * to an ITEM_MUTATED event by calling the PubSub#asyncIterator.
   * This method takes a single argument, the triggerName,
   * which corresponds to an event topic name.
   *
   * @param {ItemMutatedArgs} itemMutated
   * @return {*}  {(AsyncIterator<PubSubEngine, UserIdArgs & DrawingNameArgs>)}
   * @memberof ItemResolver
   */
  @Subscription((returns) => ItemMutation, {
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

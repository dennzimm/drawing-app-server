import { Inject, Injectable } from '@nestjs/common';
import {
  Item,
  ItemCreateInput,
  ItemOrderByInput,
  ItemUpdateInput,
  ItemWhereInput,
  ItemWhereUniqueInput,
} from '@prisma/client';
import { PubSubEngine } from 'apollo-server-express';
import { PrismaService } from '../../prisma/prisma.service';
import { MutationType } from '../common/enums/mutation.enum';
import { SubscriptionType } from '../common/enums/subscription.enum';
import {
  Mutation,
  MutationNode,
} from '../common/interfaces/mutation.interface';

/**
 * PublishItemMutationPayload Interface
 *
 * @export
 * @interface PublishItemMutationPayload
 */
export interface PublishItemMutationPayload {
  [SubscriptionType.ITEM_MUTATED]: {
    mutation: MutationType;
    node: Item & {
      mutation: MutationType;
    };
    variables: MutationNode<Item>['variables'];
  };
}

/**
 * This ItemService provides CRUD methods for Items.
 * By using the PrismaService it is possible to communicate with the database.
 * The business logic of the ItemResolver is outsourced to this service class.
 *
 * @export
 * @class ItemService
 */
@Injectable()
export class ItemService {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Find zero or one Item.
   *
   * @param {ItemWhereUniqueInput} itemWhereUniqueInput
   * @return {*}  {(Promise<Item | null>)}
   * @memberof ItemService
   */
  async item(itemWhereUniqueInput: ItemWhereUniqueInput): Promise<Item | null> {
    return this.prisma.item.findOne({
      where: itemWhereUniqueInput,
    });
  }

  /**
   * Find zero or more Items.
   *
   * @param {{
   *     skip?: number;
   *     take?: number;
   *     cursor?: ItemWhereUniqueInput;
   *     where?: ItemWhereInput;
   *     orderBy?: ItemOrderByInput;
   *   }} params
   * @return {*}  {Promise<Item[]>}
   * @memberof ItemService
   */
  async items(params: {
    skip?: number;
    take?: number;
    cursor?: ItemWhereUniqueInput;
    where?: ItemWhereInput;
    orderBy?: ItemOrderByInput;
  }): Promise<Item[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.item.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * Create an Item.
   *
   * @param {ItemCreateInput} data
   * @return {*}  {Promise<Item>}
   * @memberof ItemService
   */
  async createItem(data: ItemCreateInput): Promise<Item> {
    return this.prisma.item.create({
      data,
    });
  }

  /**
   * Update an Item.
   *
   * @param {{
   *     where: ItemWhereUniqueInput;
   *     data: ItemUpdateInput;
   *   }} params
   * @return {*}  {Promise<Item>}
   * @memberof ItemService
   */
  async updateItem(params: {
    where: ItemWhereUniqueInput;
    data: ItemUpdateInput;
  }): Promise<Item> {
    const { where, data } = params;
    return this.prisma.item.update({
      data,
      where,
    });
  }

  /**
   * Delete an Item.
   *
   * @param {ItemWhereUniqueInput} where
   * @return {*}  {Promise<Item>}
   * @memberof ItemService
   */
  async deleteItem(where: ItemWhereUniqueInput): Promise<Item> {
    return this.prisma.item.delete({
      where,
    });
  }

  /**
   * Publish an ITEM_MUTATED event.
   * For this purpose the pubSub-Provider is used.
   *
   * @param {Mutation<Item>} { mutation, payload }
   * @memberof ItemService
   */
  publishItemMutation({ mutation, payload }: Mutation<Item>) {
    const subscriptionPayload: PublishItemMutationPayload = {
      [SubscriptionType.ITEM_MUTATED]: {
        mutation,
        node: {
          ...payload.node,
          mutation,
        },
        variables: payload.variables,
      },
    };

    this.pubSub.publish(SubscriptionType.ITEM_MUTATED, subscriptionPayload);
  }
}

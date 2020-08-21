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
import { MutationType } from '../common/enums/mutation.enum';
import { SubscriptionType } from '../common/enums/subscription.enum';
import {
  Mutation,
  MutationNode,
} from '../common/interfaces/mutation.interface';
import { PrismaService } from '../../prisma/prisma.service';

export interface PublishItemMutationPayload {
  [SubscriptionType.ITEM_MUTATED]: {
    mutation: MutationType;
    node: Item & {
      mutation: MutationType;
    };
    variables: MutationNode<Item>['variables'];
  };
}

@Injectable()
export class ItemService {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private readonly prisma: PrismaService,
  ) {}

  async item(itemWhereUniqueInput: ItemWhereUniqueInput): Promise<Item | null> {
    return this.prisma.item.findOne({
      where: itemWhereUniqueInput,
    });
  }

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

  async createItem(data: ItemCreateInput): Promise<Item> {
    return this.prisma.item.create({
      data,
    });
  }

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

  async deleteItem(where: ItemWhereUniqueInput): Promise<Item> {
    return this.prisma.item.delete({
      where,
    });
  }

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

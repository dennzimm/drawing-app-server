import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSubEngine } from 'apollo-server-express';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import Drawing from '../entities/drawing.entity';
import Item from '../entities/item.entity';
import { ItemSubscriptionType } from '../enums/item.enums';
import {
  CreateItemProps,
  DeleteItemProps,
  PublishItemMutationProps,
  UpdateItemProps,
} from '../interfaces/item.types';
import { ItemObjectType } from '../models/item.model';

@Injectable()
export class ItemsService {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    @InjectRepository(Drawing)
    private drawingsRepository: Repository<Drawing>,
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async create(props: CreateItemProps): Promise<ItemObjectType> {
    const { drawingID, itemData } = props;

    const drawing = await this.drawingsRepository.findOne({ id: drawingID });

    if (!drawing) {
      throw new NotFoundException(drawingID);
    }

    const newItem = await this.itemsRepository.create(itemData);
    drawing.items.push(newItem);

    await this.drawingsRepository.save(drawing);

    return newItem;
  }

  async update(props: UpdateItemProps): Promise<ItemObjectType> {
    const {
      drawingID,
      itemData: { id, data },
    } = props;

    const item = await this.itemsRepository.findOne({
      where: [{ id: id }, { drawing: { id: drawingID } }],
    });

    if (!item) {
      throw new NotFoundException({ drawingID, itemID: id });
    }

    item.data = data;

    return from(this.itemsRepository.save(item))
      .pipe(map((item) => this.itemReducer(item)))
      .toPromise();
  }

  async deleteOne(props: DeleteItemProps): Promise<ItemObjectType> {
    const { drawingID, itemID } = props;

    const item = await this.itemsRepository.findOne({
      where: [{ id: itemID }, { drawing: { id: drawingID } }],
    });

    if (!item) {
      throw new NotFoundException({ drawingID, itemID });
    }

    return from(this.itemsRepository.remove(item))
      .pipe(map((item) => this.itemReducer(item)))
      .toPromise();
  }

  publishItemMutation(props: PublishItemMutationProps) {
    const { mutation, payload } = props;

    this.pubSub.publish(ItemSubscriptionType.ITEM_MUTATED, {
      [ItemSubscriptionType.ITEM_MUTATED]: {
        mutation,
        node: payload.node,
        ...payload.variables,
      },
    });
  }

  private itemReducer(item: Item): ItemObjectType {
    return {
      id: item.id,
      data: item.data,
    };
  }
}

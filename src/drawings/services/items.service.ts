import { Injectable, Logger } from '@nestjs/common';
import { Item } from '../models/item.model';
import { Segment } from '../models/segment.model';

@Injectable()
export class ItemsService {
  private logger = new Logger(ItemsService.name);
  private readonly items = {};

  async create(createItemInput: Item): Promise<Item> {
    const { itemID } = createItemInput;

    this.items[itemID] = createItemInput;

    return createItemInput;
  }

  async update(updateItemInput: Item): Promise<Item> {
    const { itemID } = updateItemInput;

    const updatedItem = {
      ...this.items[itemID],
      ...updateItemInput,
    };

    this.items[itemID] = updatedItem;

    return updatedItem;
  }

  async addSegment(addSegmentInput: Segment): Promise<Segment> {
    const { itemID } = addSegmentInput;

    this.items[itemID].data[1].segments.push(addSegmentInput);

    return addSegmentInput;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteItemArgs } from '../dto/args/delete-item.args';
import { AddItemInput } from '../dto/input/add-item.input';
import { Item } from '../models/item.model';
import { Drawing } from '../schemas/drawing.schema';
import { Item as ItemDoc } from '../schemas/item.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Drawing.name)
    private drawingModel: Model<Drawing>,
    @InjectModel(ItemDoc.name)
    private itemModel: Model<ItemDoc>,
  ) {}

  itemReducer(itemDoc: ItemDoc): Item {
    try {
      return {
        itemID: itemDoc.itemID,
        itemData: itemDoc.itemData,
      };
    } catch (err) {
      return null;
    }
  }

  async create(args: AddItemInput): Promise<Item> {
    const { drawingID, itemID, itemData } = args;
    const newItem = await new this.itemModel({ itemID, itemData }).save();

    await this.drawingModel.findOneAndUpdate(
      { drawingID },
      { $push: { items: newItem._id } },
      { new: true, useFindAndModify: false },
    );

    return this.itemReducer(newItem);
  }

  async delete(args: DeleteItemArgs): Promise<Item> {
    const { drawingID, itemID } = args;

    const foundItem = await this.itemModel.findOne({ itemID });
    await foundItem.remove();

    await this.drawingModel.findOneAndUpdate(
      { drawingID },
      { $pull: { items: foundItem._id } },
      { new: true, useFindAndModify: false },
    );

    return this.itemReducer(foundItem);
  }
}

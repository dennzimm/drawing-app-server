import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteItemArgs } from '../dto/args/delete-item.args';
import { AddItemInput } from '../dto/input/add-item.input';
import { Drawing } from '../schemas/drawing.schema';
import { Item as ItemDoc } from '../schemas/item.schema';
import { ItemUnion } from '../unions/item.union';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Drawing.name)
    private drawingModel: Model<Drawing>,
    @InjectModel(ItemDoc.name)
    private itemModel: Model<ItemDoc>,
  ) {}

  itemReducer(itemDoc: ItemDoc): typeof ItemUnion {
    try {
      return {
        itemID: itemDoc.itemID,
        itemData: itemDoc.itemData,
      } as any;
    } catch (err) {
      return null;
    }
  }

  async create(args: AddItemInput): Promise<typeof ItemUnion> {
    const { drawingID, itemID, itemData } = args;
    const newItem = await new this.itemModel({ itemID, itemData }).save();

    await this.drawingModel.findOneAndUpdate(
      { drawingID },
      { $push: { items: newItem._id } },
      { new: true, useFindAndModify: false },
    );

    return this.itemReducer(newItem);
  }

  async deleteOne(args: DeleteItemArgs): Promise<typeof ItemUnion> {
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

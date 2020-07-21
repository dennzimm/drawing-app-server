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

  itemReducer(item: ItemDoc): Item {
    try {
      return {
        id: item.id,
        name: item.name,
        data: item.data,
      };
    } catch (err) {
      return null;
    }
  }

  async addToDrawing(args: AddItemInput): Promise<Item> {
    const { drawing, name, data } = args;
    const newItem = await new this.itemModel({ name, data }).save();

    await this.drawingModel.findOneAndUpdate(
      { name: drawing },
      { $push: { items: newItem._id } },
      { new: true, useFindAndModify: false },
    );

    return this.itemReducer(newItem);
  }

  async delete(args: DeleteItemArgs): Promise<Item> {
    const { drawing, name } = args;

    const foundItem = await this.itemModel.findOne({ name });
    await foundItem.remove();

    await this.drawingModel.findOneAndUpdate(
      { name: drawing },
      { $pull: { items: foundItem._id } },
      { new: true, useFindAndModify: false },
    );

    return this.itemReducer(foundItem);
  }
}

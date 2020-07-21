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

  addToDrawing(args: AddItemInput): Promise<ItemDoc> {
    const { drawing, name, data } = args;
    const newItem = new this.itemModel({ name, data });

    return this.itemModel.create(newItem).then(docItem => {
      return this.drawingModel
        .findOneAndUpdate(
          { name: drawing },
          { $push: { items: docItem._id } },
          { new: true, useFindAndModify: false },
        )
        .then(() => docItem);
    });
  }

  delete(args: DeleteItemArgs): Promise<ItemDoc> {
    const { drawing, name } = args;

    return this.itemModel.findOne({ name }).then(docItem => {
      return docItem.remove().then(() => {
        return this.drawingModel
          .findOneAndUpdate(
            { name: drawing },
            { $pull: { items: docItem._id } },
            { new: true, useFindAndModify: false },
          )
          .then(() => docItem);
      });
    });
  }
}

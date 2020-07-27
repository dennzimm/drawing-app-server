import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DrawingArgs } from '../dto/args/drawing.args';
import { CreateDrawingInput } from '../dto/input/create-drawing.input';
import { DrawingObjectType } from '../models/drawing.model';
import { Drawing as DrawingDoc } from '../schemas/drawing.schema';
import { Item as ItemDoc } from '../schemas/item.schema';
import { ItemUnion } from '../unions/item.union';

@Injectable()
export class DrawingsService {
  constructor(
    @InjectModel(DrawingDoc.name)
    private drawingModel: Model<DrawingDoc>,
  ) {}

  drawingReducer(drawingDoc: DrawingDoc): DrawingObjectType {
    try {
      let items: typeof ItemUnion[] = [];

      if (drawingDoc.items instanceof ItemDoc) {
        items = drawingDoc.items.map(
          (itemDoc: ItemDoc) =>
            ({
              itemID: itemDoc.itemID,
              itemData: itemDoc.itemData,
            } as any),
        );
      }

      return {
        drawingID: drawingDoc.drawingID,
        items,
      };
    } catch (err) {
      return null;
    }
  }

  async create(args: CreateDrawingInput): Promise<DrawingObjectType> {
    const createdDrawing = await new this.drawingModel(args).save();

    return this.drawingReducer(createdDrawing);
  }

  async findOne(conditions: DrawingArgs): Promise<DrawingObjectType> {
    const foundDrawing = await this.drawingModel
      .findOne(conditions)
      .populate('items');

    return this.drawingReducer(foundDrawing);
  }
}

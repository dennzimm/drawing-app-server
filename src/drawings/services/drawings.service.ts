import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DrawingArgs } from '../dto/args/drawing.args';
import { CreateDrawingInput } from '../dto/input/create-drawing.input';
import { Drawing } from '../models/drawing.model';
import { Drawing as DrawingDoc } from '../schemas/drawing.schema';

@Injectable()
export class DrawingsService {
  constructor(
    @InjectModel(DrawingDoc.name)
    private drawingModel: Model<DrawingDoc>,
  ) {}

  drawingReducer(drawing: DrawingDoc): Drawing {
    try {
      return {
        id: drawing.id,
        name: drawing.name,
        items: drawing.items as any,
      };
    } catch (err) {
      return null;
    }
  }

  async create(args: CreateDrawingInput): Promise<DrawingDoc> {
    const createdDrawing = new this.drawingModel(args);

    return createdDrawing.save();
  }

  async find(conditions: DrawingArgs): Promise<DrawingDoc> {
    return this.drawingModel.findOne(conditions).populate('items');
  }
}

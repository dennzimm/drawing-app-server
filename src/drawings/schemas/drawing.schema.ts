import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Item } from './item.schema';

@Schema()
export class Drawing extends Document {
  @Prop({
    required: true,
    unique: true,
    immutable: true,
  })
  drawingID: string;

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: 'Item',
    },
  ])
  items: (MongooseSchema.Types.ObjectId | Item)[];
}

export const DrawingSchema = SchemaFactory.createForClass(Drawing);

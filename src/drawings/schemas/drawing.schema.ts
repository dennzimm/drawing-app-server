import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { PaperAttributes } from './paper-attributes.schema';

@Schema()
export class Drawing extends PaperAttributes {
  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: 'Item',
    },
  ])
  items: MongooseSchema.Types.ObjectId[];
}

export const DrawingSchema = SchemaFactory.createForClass(Drawing);

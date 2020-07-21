import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item extends Document {
  @Prop({
    required: true,
    unique: true,
    immutable: true,
  })
  itemID: string;

  @Prop()
  itemData: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

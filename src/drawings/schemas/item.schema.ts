import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaperAttributes } from './paper-attributes.schema';

@Schema()
export class Item extends PaperAttributes {
  @Prop()
  data: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

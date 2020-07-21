import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export abstract class PaperAttributes extends Document {
  @Prop({
    required: true,
    unique: true,
    immutable: true,
  })
  readonly name: string;
}

import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaperItemData } from '../interfaces/paper-item.interface';
import { PaperItemScalar as PaperItem } from '../scalars/paper-item.scalar';

@InputType('ItemInput')
@ObjectType()
export class Item {
  userID: string;
  drawingID: string;
  itemID: string;

  @Field(type => PaperItem)
  data: PaperItemData;
}

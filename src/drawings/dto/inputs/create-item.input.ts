import { InputType } from '@nestjs/graphql';
import { ItemType } from '../../models/item.model';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateItemInput {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: ItemType;

  @IsNotEmpty()
  data: string;
}

import { InputType } from '@nestjs/graphql';
import { ItemType } from '../../models/item.model';
import { IsNotEmpty } from 'class-validator';

/**
 * Using input-types, whole objects can be passed as argument to a field.
 */

/**
 * CreateItemInput InputType
 *
 * @export
 * @class CreateItemInput
 */
@InputType()
export class CreateItemInput {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: ItemType;

  @IsNotEmpty()
  data: string;
}

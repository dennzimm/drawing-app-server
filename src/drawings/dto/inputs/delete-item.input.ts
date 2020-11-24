import { InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

/**
 * Using input-types, whole objects can be passed as argument to a field.
 */

/**
 * DeleteItemInput InputType
 *
 * @export
 * @class DeleteItemInput
 */
@InputType()
export class DeleteItemInput {
  @IsNotEmpty()
  name: string;
}

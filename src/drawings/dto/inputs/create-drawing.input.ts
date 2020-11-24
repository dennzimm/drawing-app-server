import { InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

/**
 * Using input-types, whole objects can be passed as argument to a field.
 */

/**
 * CreateDrawingInput InputType
 *
 * @export
 * @class CreateDrawingInput
 */
@InputType()
export class CreateDrawingInput {
  @IsNotEmpty()
  name: string;
}

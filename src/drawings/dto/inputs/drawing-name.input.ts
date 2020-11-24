import { InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

/**
 * Using input-types, whole objects can be passed as argument to a field.
 */

/**
 * DrawingNameInput InputType
 *
 * @export
 * @class DrawingNameInput
 */
@InputType()
export class DrawingNameInput {
  @IsNotEmpty()
  drawingName: string;
}

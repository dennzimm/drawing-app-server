import { ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

/**
 * DrawingNameArgs ArgsType
 *
 * @export
 * @class DrawingNameArgs
 */
@ArgsType()
export class DrawingNameArgs {
  @IsNotEmpty()
  drawingName: string;
}

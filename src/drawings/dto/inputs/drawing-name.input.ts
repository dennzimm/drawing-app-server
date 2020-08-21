import { InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DrawingNameInput {
  @IsNotEmpty()
  drawingName: string;
}

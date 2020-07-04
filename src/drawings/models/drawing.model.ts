import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaperDrawingData } from '../interfaces/paper-drawing.interface';
import { PaperDrawingScalar as PaperDrawing } from '../scalars/paper-drawing.scalar';

@InputType('DrawingInput')
@ObjectType()
export class Drawing {
  userID: string;
  drawingID: string;

  @Field(type => PaperDrawing)
  data: PaperDrawingData;
}

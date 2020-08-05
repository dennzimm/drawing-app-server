import { Field, ID, InputType, PickType } from '@nestjs/graphql';
import { CommonDrawingInput } from '../../common/dto/common-drawing.dto';

@InputType()
export class CreateDrawingInput extends PickType(CommonDrawingInput, [
  'userID',
] as const) {
  @Field(type => ID)
  id: string;
}

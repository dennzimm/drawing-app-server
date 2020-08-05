import { Field, ID, InputType } from '@nestjs/graphql';
import { CommonDrawingInput } from '../../common/dto/common-drawing.dto';

@InputType()
export class CreateItemInput extends CommonDrawingInput {
  @Field(type => ID)
  id: string;

  @Field(type => String)
  data: string;
}

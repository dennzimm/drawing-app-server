import { ArgsType, Field, ID, PickType } from '@nestjs/graphql';
import { CommonDrawingArgs } from '../../common/dto/common-drawing.dto';

@ArgsType()
export class GetDrawingArgs extends PickType(CommonDrawingArgs, [
  'userID',
] as const) {
  @Field(type => ID)
  id: string;
}

@ArgsType()
export class DrawingDataPublishedArgs extends CommonDrawingArgs {}

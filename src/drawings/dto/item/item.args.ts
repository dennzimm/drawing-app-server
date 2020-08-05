import { ArgsType, Field, ID } from '@nestjs/graphql';
import { CommonDrawingArgs } from '../../common/dto/common-drawing.dto';

@ArgsType()
export class DeleteItemArgs extends CommonDrawingArgs {
  @Field(type => ID)
  itemID: string;
}

@ArgsType()
export class ItemMutatedArgs extends CommonDrawingArgs {}

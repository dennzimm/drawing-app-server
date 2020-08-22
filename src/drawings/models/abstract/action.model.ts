import { InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export abstract class DrawingActionPayload {
  layerID: string;

  @IsOptional()
  groupID?: string;

  itemID: string;
}

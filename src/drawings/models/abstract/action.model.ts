import { ObjectType, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export abstract class DrawingActionPayload {
  layerID: string;

  groupID?: string;

  itemID: string;
}

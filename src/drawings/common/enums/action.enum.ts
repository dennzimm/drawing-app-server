import { registerEnumType } from '@nestjs/graphql';

export enum ActionType {
  PENCIL_DRAW = 'pencilDraw',
  BRUSH_DRAW = 'brushDraw',
  ERASE = 'erase',
}

registerEnumType(ActionType, {
  name: 'ActionType',
});

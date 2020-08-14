import { registerEnumType } from '@nestjs/graphql';

export enum DrawingDataActionType {
  PENCIL_DRAWING = 'PENCIL_DRAWING',
  BRUSH_DRAWING = 'BRUSH_DRAWING',
  ERASE_DRAWING = 'ERASE_DRAWING',
}

registerEnumType(DrawingDataActionType, {
  name: 'DrawingDataMutationType',
});

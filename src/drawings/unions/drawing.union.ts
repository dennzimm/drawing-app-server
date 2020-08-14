import { createUnionType } from '@nestjs/graphql';
import {
  PencilDrawingPayload,
  BrushDrawingPayload,
  EraseDrawingPayload,
} from '../dto/drawing-data/drawing-data.dto';
import { DrawingDataActionType } from '../enums/drawing-data.enums';

export const PublishedDrawingDataNode = createUnionType({
  name: 'PublishedDrawingDataNode',
  types: () => [PencilDrawingPayload, BrushDrawingPayload, EraseDrawingPayload],
  resolveType(value) {
    switch (value.action) {
      case DrawingDataActionType.PENCIL_DRAWING:
        return PencilDrawingPayload;
      case DrawingDataActionType.BRUSH_DRAWING:
        return BrushDrawingPayload;
      case DrawingDataActionType.ERASE_DRAWING:
        return EraseDrawingPayload;
      default:
        return null;
    }
  },
});

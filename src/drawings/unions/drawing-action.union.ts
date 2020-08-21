import { createUnionType } from '@nestjs/graphql';
import { ActionType } from '../common/enums/action.enum';
import {
  BrushDrawActionPayload,
  PencilDrawActionPayload,
  EraseActionPayload,
} from '../dto/drawing-action.dto';

export const DrawingActionDataNode = createUnionType({
  name: 'PublishedDrawingDataNode',
  types: () => [
    PencilDrawActionPayload,
    BrushDrawActionPayload,
    EraseActionPayload,
  ],
  resolveType(value) {
    switch (value.action) {
      case ActionType.PENCIL_DRAW:
        return PencilDrawActionPayload;
      case ActionType.BRUSH_DRAW:
        return BrushDrawActionPayload;
      case ActionType.ERASE:
        return EraseActionPayload;
      default:
        return null;
    }
  },
});

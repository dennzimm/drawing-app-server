import { createUnionType } from '@nestjs/graphql';
import { ActionType } from '../common/enums/action.enum';
import {
  BrushDrawActionPayload,
  PencilDrawActionPayload,
  EraseActionPayload,
} from '../dto/drawing-action.dto';

/**
 * This DrawingActionDataNode union is specified to define the different
 * return values of the DrawingActionDataNode.
 *
 * A union is used to indicate that a field can have multiple return values.
 */
export const DrawingActionDataNode = createUnionType({
  name: 'DrawingActionDataNode',
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

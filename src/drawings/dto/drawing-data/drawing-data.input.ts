import { InputType, IntersectionType } from '@nestjs/graphql';
import { CommonDrawingInput } from '../../common/dto/common-drawing.dto';
import {
  BrushDrawingPayload,
  EraseDrawingPayload,
  PencilDrawingPayload,
} from './drawing-data.dto';

@InputType()
export class PencilDrawingInput extends IntersectionType(
  CommonDrawingInput,
  PencilDrawingPayload,
) {}

@InputType()
export class BrushDrawingInput extends IntersectionType(
  CommonDrawingInput,
  BrushDrawingPayload,
) {}

@InputType()
export class EraseDrawingInput extends IntersectionType(
  CommonDrawingInput,
  EraseDrawingPayload,
) {}

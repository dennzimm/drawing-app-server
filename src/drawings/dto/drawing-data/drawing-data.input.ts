import { InputType, IntersectionType, Field } from '@nestjs/graphql';
import { CommonDrawingInput } from '../../common/dto/common-drawing.dto';
import {
  BrushDrawingPayload,
  EraseDrawingPayload,
  PencilDrawingPayload,
} from './drawing-data.dto';
import { SegmentObjectType as Segment } from '../../models/segment.model';

@InputType()
export class PencilDrawingInput extends IntersectionType(
  CommonDrawingInput,
  PencilDrawingPayload,
) {}

@InputType()
export class BrushDrawingInput extends IntersectionType(
  CommonDrawingInput,
  BrushDrawingPayload,
) {
  @Field((type) => [Segment])
  segments: Segment[];
}

@InputType()
export class EraseDrawingInput extends IntersectionType(
  CommonDrawingInput,
  EraseDrawingPayload,
) {}

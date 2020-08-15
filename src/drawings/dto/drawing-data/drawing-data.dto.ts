import { Field, ObjectType, OmitType, InputType } from '@nestjs/graphql';
import { CommonItemObjectType } from '../../common/dto/common-item.dto';
import { ActionPayload } from '../../common/interfaces/action.interface';
import { DrawingDataActionType } from '../../enums/drawing-data.enums';
import { PathObjectType as Path } from '../../models/path.model';
import { SegmentObjectType as Segment } from '../../models/segment.model';
import { PublishedDrawingDataNode } from '../../unions/drawing.union';

@ObjectType('PublishedDrawingData')
export class PublishedDrawingDataPayload
  implements
    ActionPayload<typeof PublishedDrawingDataNode, DrawingDataActionType> {
  @Field((type) => DrawingDataActionType)
  action: DrawingDataActionType;

  @Field((type) => PublishedDrawingDataNode)
  node: typeof PublishedDrawingDataNode;
}

@ObjectType('PencilDrawing')
export class PencilDrawingPayload extends CommonItemObjectType {
  @Field((type) => Segment)
  segment: Segment;

  @Field((type) => Path)
  path: Path;
}
@ObjectType('BrushDrawing')
export class BrushDrawingPayload extends CommonItemObjectType {
  @Field((type) => [Segment])
  segments: Segment[];

  @Field((type) => Path)
  path: Path;
}

@ObjectType('EraseDrawing')
export class EraseDrawingPayload extends OmitType(CommonItemObjectType, [
  'groupID',
] as const) {
  @Field((type) => Segment)
  segment: Segment;

  @Field((type) => Path)
  path: Pick<Path, 'strokeWidth'>;
}

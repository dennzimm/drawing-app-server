import {
  Field,
  ID,
  InputType,
  IntersectionType,
  ObjectType,
} from '@nestjs/graphql';
import { CommonDrawingInput } from '../common/dto/common-drawing.dto';
import { PathObjectType as Path } from './path.model';
import { PointObjectType as Point } from './point.model';

@ObjectType('Segment')
export class SegmentObjectType {
  @Field((type) => ID, { nullable: true })
  layerID?: string;

  @Field((type) => ID, { nullable: true })
  groupID?: string;

  @Field((type) => ID)
  itemID: string;

  @Field((type) => Point)
  point: Point;

  @Field((type) => Path)
  path: Path;
}

@InputType()
export class SegmentInput extends IntersectionType(
  CommonDrawingInput,
  SegmentObjectType,
) {}

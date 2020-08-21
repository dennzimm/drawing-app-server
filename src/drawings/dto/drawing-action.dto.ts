import {
  ArgsType,
  Field,
  InputType,
  IntersectionType,
  ObjectType,
} from '@nestjs/graphql';
import { ActionType } from '../common/enums/action.enum';
import { DrawingActionPayload } from '../models/abstract/action.model';
import { Path } from '../models/path.model';
import { Segment } from '../models/segment.model';
import { DrawingActionDataNode } from '../unions/drawing-action.union';
import { DrawingNameArgs } from './args/drawing-name.args';
import { UserIdArgs } from './args/user-id.args';

@InputType('PencilDrawInput')
@ObjectType('PencilDraw')
export class PencilDrawActionPayload extends DrawingActionPayload {
  @Field(type => Segment)
  segment: Segment;

  @Field(type => Path)
  path: Path;
}

@InputType('BrushDrawInput')
@ObjectType('BrushDraw')
export class BrushDrawActionPayload extends DrawingActionPayload {
  @Field(type => [Segment])
  segments: Segment[];

  @Field(type => Path)
  path: Path;
}

@InputType('EraseInput')
@ObjectType('Erase')
export class EraseActionPayload extends DrawingActionPayload {
  @Field(type => Segment)
  segment: Segment;

  @Field(type => Path)
  path: Path;
}

@ObjectType()
export class DrawingAction {
  @Field(type => ActionType)
  action: ActionType;

  @Field(type => DrawingActionDataNode)
  node: typeof DrawingActionDataNode;
}

@ArgsType()
export class DrawingActionArgs extends IntersectionType(
  UserIdArgs,
  DrawingNameArgs,
) {}

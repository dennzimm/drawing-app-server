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
import { Point } from '../models/point.model';
import { Segment } from '../models/segment.model';
import { DrawingActionDataNode } from '../unions/drawing-action.union';
import { DrawingNameArgs } from './args/drawing-name.args';
import { UserIdArgs } from './args/user-id.args';
import { IsOptional } from 'class-validator';

@InputType('PencilDrawInput')
@ObjectType('PencilDraw')
export class PencilDrawActionPayload extends DrawingActionPayload {
  @Field(type => Path)
  path: Path;

  @Field(type => Point)
  point: Point;
}

@InputType('BrushDrawInput')
@ObjectType('BrushDraw')
export class BrushDrawActionPayload extends DrawingActionPayload {
  @Field(type => Path)
  path: Path;

  @IsOptional()
  @Field(type => Point, { nullable: true })
  delta: Point;

  @IsOptional()
  @Field(type => Point, { nullable: true })
  middlePoint: Point;

  @IsOptional()
  @Field(type => Point, { nullable: true })
  singlePoint?: Point;
}

@InputType('EraseInput')
@ObjectType('Erase')
export class EraseActionPayload extends DrawingActionPayload {
  @Field(type => Path)
  path: Path;

  @Field(type => Point)
  point: Point;
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

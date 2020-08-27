import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { ActionType } from '../common/enums/action.enum';
import { SubscriptionType } from '../common/enums/subscription.enum';
import { DrawingNameArgs } from '../dto/args/drawing-name.args';
import { UserIdArgs } from '../dto/args/user-id.args';
import {
  BrushDrawActionPayload,
  DrawingAction,
  DrawingActionArgs,
  EraseActionPayload,
  PencilDrawActionPayload,
} from '../dto/drawing-action.dto';
import { DrawingNameInput } from '../dto/inputs/drawing-name.input';
import { UserIdInput } from '../dto/inputs/user-id.input';
import {
  DrawingActionService,
  PublishDrawingActionPayload,
} from '../services/drawing-action.service';

@Resolver('DrawingAction')
export class DrawingActionResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private drawingActionService: DrawingActionService,
  ) {}

  @Mutation((returns) => Boolean)
  async pencilDraw(
    @Args('data') data: PencilDrawActionPayload,
    @Args('user') { userId }: UserIdInput,
    @Args('drawing') { drawingName }: DrawingNameInput,
  ) {
    try {
      this.drawingActionService.publishDrawingAction({
        action: ActionType.PENCIL_DRAW,
        payload: {
          node: data,
          variables: {
            userId,
            drawingName,
          },
        },
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async brushDraw(
    @Args('data') data: BrushDrawActionPayload,
    @Args('user') { userId }: UserIdInput,
    @Args('drawing') { drawingName }: DrawingNameInput,
  ) {
    try {
      this.drawingActionService.publishDrawingAction({
        action: ActionType.BRUSH_DRAW,
        payload: {
          node: data,
          variables: {
            userId,
            drawingName,
          },
        },
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async erase(
    @Args('data') data: EraseActionPayload,
    @Args('user') { userId }: UserIdInput,
    @Args('drawing') { drawingName }: DrawingNameInput,
  ) {
    try {
      this.drawingActionService.publishDrawingAction({
        action: ActionType.ERASE,
        payload: {
          node: data,
          variables: {
            userId,
            drawingName,
          },
        },
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  @Subscription((returns) => DrawingAction, {
    filter: (
      { drawingActionPublished }: PublishDrawingActionPayload,
      { userId, drawingName }: DrawingActionArgs,
    ) => {
      if (!userId || !drawingName) {
        return true;
      }

      const isUser = drawingActionPublished.variables.userId === userId;
      const isDrawing =
        drawingActionPublished.variables.drawingName === drawingName;

      return !isUser && isDrawing;
    },
  })
  drawingActionPublished(
    @Args() drawingAction: DrawingActionArgs,
  ): AsyncIterator<PubSubEngine, UserIdArgs & DrawingNameArgs> {
    return this.pubSub.asyncIterator(SubscriptionType.DRAWING_ACTION);
  }
}

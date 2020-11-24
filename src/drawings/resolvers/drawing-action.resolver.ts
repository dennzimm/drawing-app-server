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

/**
 * The DrawingActionResolver provides GraphQL operations for DrawingActions.
 * The business logic of this resolver is outsourced to the DrawingActionService class.
 *
 * Resolvers provide the instructions for turning a GraphQL operation
 * (a query, mutation, or subscription) into data. They return the same
 * shape of data we specify in our schema -- either synchronously or as a
 * promise that resolves to a result of that shape.
 *
 * (see https://docs.nestjs.com/graphql/resolvers)
 *
 * @export
 * @class DrawingActionResolver
 */
@Resolver('DrawingAction')
export class DrawingActionResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private drawingActionService: DrawingActionService,
  ) {}

  /**
   * {Mutation} Publishes the pencilDraw data to the drawingActionPublished subscribers.
   *
   * This mutation is used to pass the data to the drawingActionPublished subscribers
   * by publishing a DRAWING_ACTION event using the publishDrawingAction method
   * of the DrawingActionService.
   *
   * The following ActionType is used here: PENCIL_DRAW
   *
   * @param {PencilDrawActionPayload} data
   * @param {UserIdInput} { userId }
   * @param {DrawingNameInput} { drawingName }
   * @return {*}
   * @memberof DrawingActionResolver
   */
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

  /**
   * {Mutation} Publishes the brushDraw data to the drawingActionPublished subscribers.
   *
   * This mutation is used to pass the data to the drawingActionPublished subscribers
   * by publishing a DRAWING_ACTION event using the publishDrawingAction method
   * of the DrawingActionService.
   *
   * The following ActionType is used here: BRUSH_DRAW
   *
   * @param {BrushDrawActionPayload} data
   * @param {UserIdInput} { userId }
   * @param {DrawingNameInput} { drawingName }
   * @return {*}
   * @memberof DrawingActionResolver
   */
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

  /**
   * {Mutation} Publishes the erase data to the drawingActionPublished subscribers.
   *
   * This mutation is used to pass the data to the drawingActionPublished subscribers
   * by publishing a DRAWING_ACTION event using the publishDrawingAction method
   * of the DrawingActionService.
   *
   * The following ActionType is used here: ERASE
   *
   * @param {EraseActionPayload} data
   * @param {UserIdInput} { userId }
   * @param {DrawingNameInput} { drawingName }
   * @return {*}
   * @memberof DrawingActionResolver
   */
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

  /**
   * {Subscription} Subscribe to DrawingAction mutations.
   *
   * The following subscription handler takes care of subscribing
   * to an DRAWING_ACTION event by calling the PubSub#asyncIterator.
   * This method takes a single argument, the triggerName,
   * which corresponds to an event topic name.
   *
   * @param {DrawingActionArgs} drawingAction
   * @return {*}  {(AsyncIterator<PubSubEngine, UserIdArgs & DrawingNameArgs>)}
   * @memberof DrawingActionResolver
   */
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

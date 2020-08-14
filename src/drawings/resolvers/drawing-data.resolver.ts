import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { drawingFilter } from '../common/filters/drawing.filter';
import { userFilter } from '../common/filters/user.filter';
import { withFilters } from '../common/filters/with-filters';
import { PublishedDrawingDataPayload } from '../dto/drawing-data/drawing-data.dto';
import {
  BrushDrawingInput,
  EraseDrawingInput,
  PencilDrawingInput,
} from '../dto/drawing-data/drawing-data.input';
import { DrawingDataPublishedArgs } from '../dto/drawing/drawing.args';
import { DrawingSubscriptionType } from '../enums/drawing.enums';
import { DrawingDataService } from '../services/drawing-data.service';

@Resolver('DrawingData')
export class DrawingDataResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private drawingDataService: DrawingDataService,
  ) {}

  @Mutation((returns) => Boolean)
  async publishPencilDrawing(
    @Args('pencilDrawingData') pencilDrawingData: PencilDrawingInput,
  ) {
    try {
      const { drawingID, userID, ...node } = pencilDrawingData;

      this.drawingDataService.publishPencilDrawing({
        node,
        variables: {
          drawingID,
          userID,
        },
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async publishBrushDrawing(
    @Args('brushDrawingData') brushDrawingData: BrushDrawingInput,
  ) {
    try {
      const { drawingID, userID, ...node } = brushDrawingData;

      this.drawingDataService.publishBrushDrawing({
        node,
        variables: {
          drawingID,
          userID,
        },
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async publishEraseDrawing(
    @Args('eraseDrawingData') eraseDrawingData: EraseDrawingInput,
  ) {
    try {
      const { drawingID, userID, ...node } = eraseDrawingData;

      this.drawingDataService.publishEraseDrawing({
        node,
        variables: {
          drawingID,
          userID,
        },
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  @Subscription((returns) => PublishedDrawingDataPayload, {
    filter: (
      payload: Record<
        DrawingSubscriptionType.DRAWING_DATA_PUBLISHED,
        typeof PublishedDrawingDataPayload
      >,
      variables: DrawingDataPublishedArgs,
    ) =>
      withFilters({
        payload,
        variables,
        key: DrawingSubscriptionType.DRAWING_DATA_PUBLISHED,
        filters: [userFilter, drawingFilter],
      }),
  })
  drawingDataPublished(
    @Args() drawingDataPublishedArgs: DrawingDataPublishedArgs,
  ): AsyncIterator<PubSubEngine, typeof PublishedDrawingDataPayload> {
    return this.pubSub.asyncIterator(
      DrawingSubscriptionType.DRAWING_DATA_PUBLISHED,
    );
  }
}

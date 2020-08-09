import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { drawingFilter } from '../common/filters/drawing.filter';
import { userFilter } from '../common/filters/user.filter';
import { withFilters } from '../common/filters/with-filters';
import {
  DrawingDataPublishedArgs,
  GetDrawingArgs,
} from '../dto/drawing/drawing.args';
import { CreateDrawingInput } from '../dto/drawing/drawing.input';
import { DrawingSubscriptionType } from '../enums/drawing.enums';
import { DrawingObjectType as Drawing } from '../models/drawing.model';
import { DrawingsService } from '../services/drawings.service';
import { PublishedDrawingDataUnion } from '../unions/drawing.union';

@Resolver((of) => Drawing)
export class DrawingsResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private drawingsService: DrawingsService,
  ) {}

  @Query((returns) => [Drawing])
  async drawings(): Promise<Drawing[]> {
    return this.drawingsService.findAll();
  }

  @Query((returns) => Drawing)
  async drawing(@Args() getDrawingArgs: GetDrawingArgs): Promise<Drawing> {
    const { id } = getDrawingArgs;
    return this.drawingsService.findById(id);
  }

  @Mutation((returns) => Drawing)
  async createDrawing(
    @Args('createDrawingData') createDrawingData: CreateDrawingInput,
  ): Promise<Drawing> {
    return this.drawingsService.create({
      drawingData: createDrawingData,
    });
  }

  @Subscription((returns) => PublishedDrawingDataUnion, {
    filter: (
      payload: Record<
        DrawingSubscriptionType.DRAWING_DATA_PUBLISHED,
        typeof PublishedDrawingDataUnion
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
  ): AsyncIterator<PubSubEngine, typeof PublishedDrawingDataUnion> {
    return this.pubSub.asyncIterator(
      DrawingSubscriptionType.DRAWING_DATA_PUBLISHED,
    );
  }
}

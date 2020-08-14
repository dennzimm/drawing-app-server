import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { GetDrawingArgs } from '../dto/drawing/drawing.args';
import { CreateDrawingInput } from '../dto/drawing/drawing.input';
import { DrawingObjectType as Drawing } from '../models/drawing.model';
import { DrawingsService } from '../services/drawings.service';

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

  @Mutation((returns) => Drawing)
  async createOrFindDrawing(
    @Args('createDrawingData') createDrawingData: CreateDrawingInput,
  ): Promise<Drawing> {
    return this.drawingsService.createOrFind({
      drawingData: createDrawingData,
    });
  }
}

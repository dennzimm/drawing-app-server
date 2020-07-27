import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DrawingArgs } from '../dto/args/drawing.args';
import { CreateDrawingInput } from '../dto/input/create-drawing.input';
import { DrawingObjectType } from '../models/drawing.model';
import { DrawingsService } from '../services/drawings.service';

@Resolver((of) => DrawingObjectType)
export class DrawingsResolver {
  constructor(private drawingsService: DrawingsService) {}

  @Query((returns) => DrawingObjectType)
  async drawing(@Args() args: DrawingArgs): Promise<DrawingObjectType> {
    return await this.drawingsService.findOne(args);
  }

  @Mutation((returns) => DrawingObjectType)
  async createDrawing(
    @Args('createDrawingData') createDrawingData: CreateDrawingInput,
  ): Promise<DrawingObjectType> {
    return await this.drawingsService.create(createDrawingData);
  }
}

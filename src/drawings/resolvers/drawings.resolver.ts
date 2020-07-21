import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DrawingArgs } from '../dto/args/drawing.args';
import { CreateDrawingInput } from '../dto/input/create-drawing.input';
import { Drawing } from '../models/drawing.model';
import { DrawingsService } from '../services/drawings.service';

@Resolver((of) => Drawing)
export class DrawingsResolver {
  constructor(private drawingsService: DrawingsService) {}

  @Query((returns) => Drawing)
  async drawing(@Args() args: DrawingArgs): Promise<Drawing> {
    return await this.drawingsService.findOne(args);
  }

  @Mutation((returns) => Drawing)
  async createDrawing(
    @Args('createDrawingData') createDrawingData: CreateDrawingInput,
  ): Promise<Drawing> {
    return await this.drawingsService.create(createDrawingData);
  }
}

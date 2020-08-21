import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DrawingNameArgs } from '../dto/args/drawing-name.args';
import { CreateDrawingInput } from '../dto/inputs/create-drawing.input';
import { Drawing } from '../models/drawing.model';
import { DrawingService } from '../services/drawing.service';

@Resolver(of => Drawing)
export class DrawingResolver {
  constructor(private drawingService: DrawingService) {}

  @Query(returns => [Drawing])
  async drawings() {
    return this.drawingService.drawings();
  }

  @Query(returns => Drawing)
  async drawing(@Args() name: DrawingNameArgs) {
    return this.drawingService.drawing({
      name: name.drawingName,
    });
  }

  @Mutation(returns => Drawing)
  async createDrawing(@Args('data') createDrawing: CreateDrawingInput) {
    return this.drawingService.createDrawing({ name: createDrawing.name });
  }

  // @Mutation(returns => Drawing)
  // async createOrFindDrawing(
  //   @Args('createDrawingData') createDrawingData: CreateDrawingInput,
  // ): Promise<Drawing> {
  //   return this.drawingsService.createOrFind({
  //     drawingData: createDrawingData,
  //   });
  // }
}

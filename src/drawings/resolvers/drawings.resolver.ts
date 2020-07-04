import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Drawing } from '../models/drawing.model';
import { DrawingsService } from '../services/drawings.service';

@Resolver(of => Drawing)
export class DrawingsResolver {
  private logger = new Logger(DrawingsResolver.name);

  constructor(private readonly drawingsService: DrawingsService) {}

  @Mutation(returns => Drawing)
  async createDrawing(
    @Args('createDrawingInput') createDrawingInput: Drawing,
  ): Promise<Drawing> {
    return await this.drawingsService.create(createDrawingInput);
  }
}

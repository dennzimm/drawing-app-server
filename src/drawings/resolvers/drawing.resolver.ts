import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DrawingNameArgs } from '../dto/args/drawing-name.args';
import { CreateDrawingInput } from '../dto/inputs/create-drawing.input';
import { Drawing } from '../models/drawing.model';
import { DrawingService } from '../services/drawing.service';

/**
 * The DrawingResolver provides GraphQL operations for Drawings.
 * The business logic of this resolver is outsourced to the DrawingService class.
 *
 * Resolvers provide the instructions for turning a GraphQL operation
 * (a query, mutation, or subscription) into data. They return the same
 * shape of data we specify in our schema -- either synchronously or as a
 * promise that resolves to a result of that shape.
 *
 * (see https://docs.nestjs.com/graphql/resolvers)
 *
 * @export
 * @class DrawingResolver
 */
@Resolver((of) => Drawing)
export class DrawingResolver {
  constructor(private drawingService: DrawingService) {}

  /**
   * {Query} Find zero or more Drawings.
   *
   * @return {*}
   * @memberof DrawingResolver
   */
  @Query((returns) => [Drawing])
  async drawings() {
    return this.drawingService.drawings();
  }

  /**
   * {Query} Find zero or one Drawing.
   *
   * @param {DrawingNameArgs} name
   * @return {*}
   * @memberof DrawingResolver
   */
  @Query((returns) => Drawing, { nullable: true })
  async drawing(@Args() name: DrawingNameArgs) {
    return this.drawingService.drawing({
      name: name.drawingName,
    });
  }

  /**
   * {Mutation} Create a Drawing.
   *
   * @param {CreateDrawingInput} createDrawing
   * @return {*}
   * @memberof DrawingResolver
   */
  @Mutation((returns) => Drawing)
  async createDrawing(@Args('data') createDrawing: CreateDrawingInput) {
    return this.drawingService.createDrawing({ name: createDrawing.name });
  }
}

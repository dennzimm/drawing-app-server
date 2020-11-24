import { InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

/**
 * In the code first approach, we don't follow the typical process
 * of creating our GraphQL schema by writing GraphQL SDL by hand.
 * Instead, we use TypeScript decorators to generate the SDL from
 * TypeScript class definitions. The @nestjs/graphql package reads
 * the metadata defined through the decorators and automatically
 * generates the schema for you.
 *
 * (see https://docs.nestjs.com/graphql/resolvers#object-types)
 */

/**
 * DrawingActionPayload Model (abstract)
 *
 * This DrawingActionPayload model represent an abstract domain object that
 * an application client might need to interact with.
 *
 * @export
 * @abstract
 * @class DrawingActionPayload
 */
@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export abstract class DrawingActionPayload {
  layerID: string;

  @IsOptional()
  groupID?: string;

  itemID: string;
}

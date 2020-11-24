import { InputType, ObjectType } from '@nestjs/graphql';
import { Point } from './point.model';

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
 * Segment Model
 *
 * This Segment model represent a domain object that
 * an application client might need to interact with.
 *
 * @export
 * @class Segment
 */
@InputType('SegmentInput')
@ObjectType()
export class Segment {
  point: Point;
}

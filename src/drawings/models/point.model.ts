import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
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
 * Point Model
 *
 * This Point model represent a domain object that
 * an application client might need to interact with.
 *
 * @export
 * @class Point
 */
@InputType('PointInput')
@ObjectType()
export class Point {
  @Field((type) => Float)
  x: number;

  @Field((type) => Float)
  y: number;

  @IsOptional()
  @Field((type) => Float)
  angle?: number;

  @IsOptional()
  @Field((type) => Float)
  angleInRadians?: number;

  @IsOptional()
  @Field((type) => Float)
  length?: number;

  @IsOptional()
  @Field((type) => Float)
  quadrant?: number;
}

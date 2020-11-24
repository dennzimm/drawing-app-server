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
 * Path Model
 *
 * This Path model represent a domain object that
 * an application client might need to interact with.
 *
 * @export
 * @class Path
 */
@InputType('PathInput')
@ObjectType()
export class Path {
  @Field((type) => Float)
  strokeWidth: number;

  @IsOptional()
  strokeColor?: string;

  @IsOptional()
  fillColor?: string;

  @IsOptional()
  strokeJoin?: string;

  @IsOptional()
  strokeCap?: string;

  @IsOptional()
  blendMode?: string;

  @IsOptional()
  @Field((type) => Boolean, { defaultValue: false, nullable: true })
  closed?: boolean;
}

import { Field, ID, ObjectType } from '@nestjs/graphql';

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
 * Model class (abstract)
 *
 * This Model class represent an abstract domain object that
 * an application client might need to interact with.
 *
 * @export
 * @abstract
 * @class Model
 */
@ObjectType({ isAbstract: true })
export abstract class Model {
  @Field((type) => ID)
  id: string;

  createdAt: Date;

  updatedAt: Date;
}

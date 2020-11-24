import { MutationType } from '../enums/mutation.enum';

/**
 * An Interface is an abstract type that includes a certain
 * set of fields that a type must include to implement the interface.
 *
 * (see https://docs.nestjs.com/graphql/interfaces)
 */

/**
 * MutationNode Interface
 *
 * @export
 * @interface MutationNode
 * @template T
 */
export interface MutationNode<T> {
  node: T;
  variables: {
    userId: string;
    drawingName: string;
  };
}

/**
 * Mutation Interface
 *
 * @export
 * @interface Mutation
 * @template T
 */
export interface Mutation<T> {
  mutation: MutationType;
  payload: MutationNode<T>;
}

import { ActionType } from '../enums/action.enum';

/**
 * An Interface is an abstract type that includes a certain
 * set of fields that a type must include to implement the interface.
 *
 * (see https://docs.nestjs.com/graphql/interfaces)
 */

/**
 * ActionNode Interface
 *
 * @export
 * @interface ActionNode
 * @template T
 */
export interface ActionNode<T> {
  node: T;
  variables: {
    userId: string;
    drawingName: string;
  };
}

/**
 * Action Interface
 *
 * @export
 * @interface Action
 * @template T
 */
export interface Action<T> {
  action: ActionType;
  payload: ActionNode<T>;
}

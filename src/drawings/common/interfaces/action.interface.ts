import { ActionType } from '../enums/action.enum';

export interface ActionNode<T> {
  node: T;
  variables: {
    userId: string;
    drawingName: string;
  };
}

export interface Action<T> {
  action: ActionType;
  payload: ActionNode<T>;
}

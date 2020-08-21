import { MutationType } from '../enums/mutation.enum';

export interface MutationNode<T> {
  node: T;
  variables: {
    userId: string;
    drawingName: string;
  };
}

export interface Mutation<T> {
  mutation: MutationType;
  payload: MutationNode<T>;
}

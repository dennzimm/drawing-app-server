import { MutationType } from '../../enums/mutation.enums';

export interface MutationPayload<T, M = MutationType> {
  mutation: M;
  node: T;
}

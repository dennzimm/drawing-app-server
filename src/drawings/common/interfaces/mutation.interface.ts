import { MutationType } from '../../enums/mutation.enums';

export interface MutationPayload<N, M = MutationType> {
  mutation: M;
  node: N;
}

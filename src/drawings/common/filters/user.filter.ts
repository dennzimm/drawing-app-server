import { FilterArgs } from './with-filters';

interface UserFilter {
  userID: string;
}

export function userFilter<
  P extends Record<string, UserFilter>,
  V extends UserFilter
>(args: FilterArgs<P, V>): boolean {
  const { payload, variables, key } = args;

  return payload[key].userID !== variables.userID;
}

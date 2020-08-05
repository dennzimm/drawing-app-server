export interface FilterArgs<P = Record<string, unknown>, V = unknown> {
  payload: P;
  variables: V;
  key: string;
}

export interface WithFiltersArgs extends FilterArgs {
  filters: ((args: FilterArgs) => boolean)[];
}

export function withFilters(args: WithFiltersArgs): boolean {
  const { filters, ...filterArgs } = args;

  return filters.every(filter => filter(filterArgs));
}

import { DrawingsResolver } from './drawings.resolver';
import { ItemsResolver } from './items.resolver';
import { PathsResolver } from './paths.resolver';

export const resolvers = [
  DrawingsResolver,
  ItemsResolver,
  PathsResolver,
] as const;

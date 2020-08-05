import { DrawingsResolver } from './drawings.resolver';
import { ItemsResolver } from './items.resolver';
import { SegmentsResolver } from './segments.resolver';

export const resolvers = [
  DrawingsResolver,
  ItemsResolver,
  SegmentsResolver,
] as const;

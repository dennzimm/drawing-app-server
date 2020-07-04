import { DrawingsResolver } from './drawings.resolver';
import { ItemsResolver } from './items.resolver';
import { PingResolver } from './ping.resolver';
import { SegmentsResolver } from './segments.resolver';

export const resolvers = [
  PingResolver,
  DrawingsResolver,
  ItemsResolver,
  SegmentsResolver,
];

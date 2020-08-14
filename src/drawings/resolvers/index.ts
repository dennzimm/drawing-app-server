import { DrawingDataResolver } from './drawing-data.resolver';
import { DrawingsResolver } from './drawings.resolver';
import { ItemsResolver } from './items.resolver';

export const resolvers = [
  DrawingsResolver,
  DrawingDataResolver,
  ItemsResolver,
] as const;

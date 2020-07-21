import { Drawing, DrawingSchema } from './drawing.schema';
import { Item, ItemSchema } from './item.schema';

export const mongooseModuleSchemas = [
  { name: Drawing.name, schema: DrawingSchema },
  { name: Item.name, schema: ItemSchema },
];

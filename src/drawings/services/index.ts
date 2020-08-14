import { DrawingsService } from './drawings.service';
import { ItemsService } from './items.service';
import { DrawingDataService } from './drawing-data.service';

export const services = [
  DrawingsService,
  DrawingDataService,
  ItemsService,
] as const;

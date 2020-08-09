import { DrawingsService } from './drawings.service';
import { ItemsService } from './items.service';
import { PathsService } from './paths.service';

export const services = [DrawingsService, ItemsService, PathsService] as const;

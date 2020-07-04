import { Injectable, Logger } from '@nestjs/common';
import { Item } from '../models/item.model';
import { Segment } from '../models/segment.model';
import { ItemsService } from './items.service';

@Injectable()
export class SegmentsService {
  private logger = new Logger(SegmentsService.name);

  constructor(private readonly itemsService: ItemsService) {}

  async addSegment(addSegmentInput: Segment): Promise<Segment> {
    return this.itemsService.addSegment(addSegmentInput);
  }
}

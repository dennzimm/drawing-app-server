import { Injectable, Logger } from '@nestjs/common';
import { Drawing } from '../models/drawing.model';

@Injectable()
export class DrawingsService {
  private readonly logger = new Logger(DrawingsService.name);
  private readonly drawings = {};

  async create(createDrawingInput: Drawing): Promise<Drawing> {
    const { drawingID } = createDrawingInput;

    this.drawings[drawingID] = createDrawingInput;

    return createDrawingInput;
  }
}

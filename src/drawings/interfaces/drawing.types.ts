import { DrawingObjectType } from '../models/drawing.model';

export interface CreateDrawingProps {
  drawingData: Omit<DrawingObjectType, 'items'>;
}

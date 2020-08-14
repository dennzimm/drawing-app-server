import { Inject, Injectable } from '@nestjs/common';
import { PubSubEngine } from 'apollo-server-express';
import { DrawingDataActionType } from '../enums/drawing-data.enums';
import { DrawingSubscriptionType } from '../enums/drawing.enums';
import {
  PublishDrawingDataPayload,
  PublishDrawingDataProps,
} from '../interfaces/drawing-data.types';

@Injectable()
export class DrawingDataService {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

  publishPencilDrawing(payload: PublishDrawingDataPayload) {
    this.publishDrawingData({
      action: DrawingDataActionType.PENCIL_DRAWING,
      payload,
    });
  }

  publishBrushDrawing(payload: PublishDrawingDataPayload) {
    this.publishDrawingData({
      action: DrawingDataActionType.BRUSH_DRAWING,
      payload,
    });
  }

  publishEraseDrawing(payload: PublishDrawingDataPayload) {
    this.publishDrawingData({
      action: DrawingDataActionType.ERASE_DRAWING,
      payload,
    });
  }

  private publishDrawingData(props: PublishDrawingDataProps) {
    const { action, payload } = props;

    this.pubSub.publish(DrawingSubscriptionType.DRAWING_DATA_PUBLISHED, {
      [DrawingSubscriptionType.DRAWING_DATA_PUBLISHED]: {
        action,
        node: { action, ...payload.node },
        ...payload.variables,
      },
    });
  }
}

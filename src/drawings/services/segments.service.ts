import { Inject, Injectable } from '@nestjs/common';
import { PubSubEngine } from 'apollo-server-express';
import { DrawingSubscriptionType } from '../enums/drawing.enum';
import { PublishNewSegmentProps } from '../interfaces/segment.types';

@Injectable()
export class SegmentsService {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

  publishNewSegment(props: PublishNewSegmentProps) {
    const { payload } = props;

    this.pubSub.publish(DrawingSubscriptionType.DRAWING_DATA_PUBLISHED, {
      [DrawingSubscriptionType.DRAWING_DATA_PUBLISHED]: {
        node: payload.node,
        ...payload.variables,
      },
    });
  }
}

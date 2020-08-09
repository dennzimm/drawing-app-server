import { Inject, Injectable } from '@nestjs/common';
import { PubSubEngine } from 'apollo-server-express';
import { DrawingSubscriptionType } from '../enums/drawing.enums';
import { PublishSegmentAddedProps } from '../interfaces/path.types';
import { PathMutationType } from '../enums/path.enums';

@Injectable()
export class PathsService {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

  publishSegmentAdded(props: PublishSegmentAddedProps) {
    const { payload } = props;

    this.pubSub.publish(DrawingSubscriptionType.DRAWING_DATA_PUBLISHED, {
      [DrawingSubscriptionType.DRAWING_DATA_PUBLISHED]: {
        mutation: PathMutationType.SEGMENT_ADDED,
        node: payload.node,
        ...payload.variables,
      },
    });
  }
}

import { CommonSubscriptionInput } from '../common/dto/common-subscription.dto';
import { SegmentObjectType } from '../models/segment.model';

export interface PublishSegmentAddedPayload {
  node: SegmentObjectType;
  variables: CommonSubscriptionInput;
}

export interface PublishSegmentAddedProps {
  payload: PublishSegmentAddedPayload;
}

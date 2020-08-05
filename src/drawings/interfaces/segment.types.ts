import { CommonSubscriptionInput } from '../common/dto/common-subscription.dto';
import { Segment } from '../models/segment.model';

export interface PublishNewSegmentPayload {
  node: Omit<Segment, 'userID' | 'drawingID'>;
  variables: CommonSubscriptionInput;
}

export interface PublishNewSegmentProps {
  payload: PublishNewSegmentPayload;
}

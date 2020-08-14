import { CommonSubscriptionInput } from '../common/dto/common-subscription.dto';
import { DrawingDataActionType } from '../enums/drawing-data.enums';
import { PublishedDrawingDataNode } from '../unions/drawing.union';

export interface PublishDrawingDataPayload {
  node: typeof PublishedDrawingDataNode;
  variables: CommonSubscriptionInput;
}

export interface PublishDrawingDataProps {
  action: DrawingDataActionType;
  payload: PublishDrawingDataPayload;
}

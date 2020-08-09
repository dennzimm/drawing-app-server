import { CommonSubscriptionInput } from '../common/dto/common-subscription.dto';
import { ItemObjectType } from '../models/item.model';
import { MutationType } from '../enums/mutation.enums';

export interface CommonItemProps {
  drawingID: string;
}

export interface CreateItemProps extends CommonItemProps {
  itemData: ItemObjectType;
}

export interface DeleteItemProps extends CommonItemProps {
  itemID: string;
}

export interface PublishItemMutationPayload {
  node: ItemObjectType;
  variables: CommonSubscriptionInput;
}

export interface PublishItemMutationProps {
  mutation: MutationType;
  payload: PublishItemMutationPayload;
}

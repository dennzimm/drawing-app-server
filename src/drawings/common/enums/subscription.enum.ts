import { registerEnumType } from '@nestjs/graphql';

export enum SubscriptionType {
  DRAWING_ACTION = 'drawingActionPublished',
  ITEM_MUTATED = 'itemMutated',
}

registerEnumType(SubscriptionType, {
  name: 'SubscriptionType',
});

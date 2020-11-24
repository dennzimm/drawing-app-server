import { registerEnumType } from '@nestjs/graphql';

/**
 * Enumeration types are a special kind of scalar that is restricted
 * to a particular set of allowed values.
 *
 * (see https://docs.nestjs.com/graphql/enums)
 */

/**
 * SubscriptionType Enum
 *
 * @export
 * @enum {number}
 */
export enum SubscriptionType {
  DRAWING_ACTION = 'drawingActionPublished',
  ITEM_MUTATED = 'itemMutated',
}

registerEnumType(SubscriptionType, {
  name: 'SubscriptionType',
});

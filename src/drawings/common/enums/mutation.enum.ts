import { registerEnumType } from '@nestjs/graphql';

/**
 * Enumeration types are a special kind of scalar that is restricted
 * to a particular set of allowed values.
 *
 * (see https://docs.nestjs.com/graphql/enums)
 */

/**
 * MutationType Enum
 *
 * @export
 * @enum {number}
 */
export enum MutationType {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
}

registerEnumType(MutationType, {
  name: 'MutationType',
});

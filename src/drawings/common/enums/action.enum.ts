import { registerEnumType } from '@nestjs/graphql';

/**
 * Enumeration types are a special kind of scalar that is restricted
 * to a particular set of allowed values.
 *
 * (see https://docs.nestjs.com/graphql/enums)
 */

/**
 * ActionType Enum
 *
 * @export
 * @enum {number}
 */
export enum ActionType {
  PENCIL_DRAW = 'pencilDraw',
  BRUSH_DRAW = 'brushDraw',
  ERASE = 'erase',
}

registerEnumType(ActionType, {
  name: 'ActionType',
});

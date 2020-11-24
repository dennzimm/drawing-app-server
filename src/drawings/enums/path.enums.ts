/**
 * Enumeration types are a special kind of scalar that is restricted
 * to a particular set of allowed values.
 *
 * (see https://docs.nestjs.com/graphql/enums)
 */

/**
 * StrokeJoinType Enum
 *
 * @export
 * @enum {number}
 */
export enum StrokeJoinType {
  MITER = 'miter',
  ROUND = 'round',
  BEVEL = 'bevel',
}

/**
 * StrokeCapType Enum
 *
 * @export
 * @enum {number}
 */
export enum StrokeCapType {
  ROUND = 'round',
  SQUARE = 'square',
  BUTT = 'butt',
}

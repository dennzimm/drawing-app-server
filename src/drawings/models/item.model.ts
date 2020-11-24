import { ObjectType, registerEnumType } from '@nestjs/graphql';
import { Model } from './abstract/model.model';

/**
 * In the code first approach, we don't follow the typical process
 * of creating our GraphQL schema by writing GraphQL SDL by hand.
 * Instead, we use TypeScript decorators to generate the SDL from
 * TypeScript class definitions. The @nestjs/graphql package reads
 * the metadata defined through the decorators and automatically
 * generates the schema for you.
 *
 * (see https://docs.nestjs.com/graphql/resolvers#object-types)
 */

/**
 * ItemType Enum
 *
 * Enumeration types are a special kind of scalar that is restricted
 * to a particular set of allowed values.
 *
 * (see https://docs.nestjs.com/graphql/enums)
 *
 * @export
 * @enum {number}
 */
export enum ItemType {
  LAYER = 'LAYER',
  GROUP = 'GROUP',
  PATH = 'PATH',
}

registerEnumType(ItemType, {
  name: 'ItemType',
  description: 'Paper Item Type (root level)',
});

/**
 * Item Model
 *
 * This Item model represent a domain object that
 * an application client might need to interact with.
 *
 * @export
 * @class Item
 * @extends {Model}
 */
@ObjectType()
export class Item extends Model {
  name: string;

  type: ItemType;

  data: string;
}

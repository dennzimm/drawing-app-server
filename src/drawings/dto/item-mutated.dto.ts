import { ArgsType, Field, IntersectionType, ObjectType } from '@nestjs/graphql';
import { MutationType } from '../common/enums/mutation.enum';
import { Item } from '../models/item.model';
import { DrawingNameArgs } from './args/drawing-name.args';
import { UserIdArgs } from './args/user-id.args';

/**
 * ItemMutation ObjectType
 *
 * @export
 * @class ItemMutation
 */
@ObjectType()
export class ItemMutation {
  @Field((type) => MutationType)
  mutation: MutationType;

  @Field((type) => Item)
  node: Item;
}

/**
 * ItemMutatedArgs ArgsType
 *
 * @export
 * @class ItemMutatedArgs
 * @extends {IntersectionType(
 *   UserIdArgs,
 *   DrawingNameArgs,
 * )}
 */
@ArgsType()
export class ItemMutatedArgs extends IntersectionType(
  UserIdArgs,
  DrawingNameArgs,
) {}

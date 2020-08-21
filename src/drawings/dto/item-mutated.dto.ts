import { ArgsType, Field, IntersectionType, ObjectType } from '@nestjs/graphql';
import { MutationType } from '../common/enums/mutation.enum';
import { DrawingNameArgs } from './args/drawing-name.args';
import { UserIdArgs } from './args/user-id.args';
import { Item } from '../models/item.model';

@ObjectType()
export class ItemMutation {
  @Field(type => MutationType)
  mutation: MutationType;

  @Field(type => Item)
  node: Item;
}

@ArgsType()
export class ItemMutatedArgs extends IntersectionType(
  UserIdArgs,
  DrawingNameArgs,
) {}
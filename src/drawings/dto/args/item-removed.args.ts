import { ArgsType } from '@nestjs/graphql';
import { CommonSubscription } from '../../common/dto/common-subscription.dto';

@ArgsType()
export class ItemRemovedArgs extends CommonSubscription {}

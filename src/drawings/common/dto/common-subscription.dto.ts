import { ArgsType, InputType } from '@nestjs/graphql';
import { CommonDrawingArgs } from './common-drawing.dto';

@ArgsType()
export class CommonSubscriptionArgs extends CommonDrawingArgs {}

@InputType()
export class CommonSubscriptionInput extends CommonDrawingArgs {}

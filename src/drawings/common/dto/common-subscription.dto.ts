import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';

@InputType('CommonSubscriptionInput')
@ArgsType()
export class CommonSubscription {
  @Field((type) => ID)
  userID: string;

  @Field((type) => ID)
  drawingID: string;
}

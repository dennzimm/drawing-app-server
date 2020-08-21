import { Inject, Injectable } from '@nestjs/common';
import { PubSubEngine } from 'apollo-server-express';
import { ActionType } from '../common/enums/action.enum';
import { SubscriptionType } from '../common/enums/subscription.enum';
import { Action, ActionNode } from '../common/interfaces/action.interface';
import { DrawingActionDataNode } from '../unions/drawing-action.union';

export interface PublishDrawingActionPayload {
  [SubscriptionType.DRAWING_ACTION]: {
    action: ActionType;
    node: typeof DrawingActionDataNode & {
      action: ActionType;
    };
    variables: ActionNode<typeof DrawingActionDataNode>['variables'];
  };
}

@Injectable()
export class DrawingActionService {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

  publishDrawingAction({
    action,
    payload,
  }: Action<typeof DrawingActionDataNode>) {
    const subscriptionPayload: PublishDrawingActionPayload = {
      [SubscriptionType.DRAWING_ACTION]: {
        action,
        node: {
          ...payload.node,
          action,
        },
        variables: payload.variables,
      },
    };

    this.pubSub.publish(SubscriptionType.DRAWING_ACTION, subscriptionPayload);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { PubSubEngine } from 'apollo-server-express';
import { ActionType } from '../common/enums/action.enum';
import { SubscriptionType } from '../common/enums/subscription.enum';
import { Action, ActionNode } from '../common/interfaces/action.interface';
import { DrawingActionDataNode } from '../unions/drawing-action.union';

/**
 * PublishDrawingActionPayload Interface
 *
 * @export
 * @interface PublishDrawingActionPayload
 */
export interface PublishDrawingActionPayload {
  [SubscriptionType.DRAWING_ACTION]: {
    action: ActionType;
    node: typeof DrawingActionDataNode & {
      action: ActionType;
    };
    variables: ActionNode<typeof DrawingActionDataNode>['variables'];
  };
}

/**
 * The DrawingActionService provides the publishDrawingAction method.
 * With this method drawing actions can be published.
 * The business logic of the DrawingActionResolver is outsourced to this service class.
 *
 * @export
 * @class DrawingActionService
 */
@Injectable()
export class DrawingActionService {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

  /**
   * This method is used to publish a drawing action.
   * For this purpose the pubSub-Provider is used.
   *
   * @param {Action<typeof DrawingActionDataNode>} {
   *     action,
   *     payload,
   *   }
   * @memberof DrawingActionService
   */
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

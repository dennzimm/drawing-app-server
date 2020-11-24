import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { DrawingActionResolver } from './resolvers/drawing-action.resolver';
import { DrawingResolver } from './resolvers/drawing.resolver';
import { ItemResolver } from './resolvers/item.resolver';
import { DrawingActionService } from './services/drawing-action.service';
import { DrawingService } from './services/drawing.service';
import { ItemService } from './services/item.service';

/**
 * This module contains all functions and GraphQL operations
 * that should allow painting together in real-time.
 *
 * We need to register the services, resolvers and scalars
 * with Nest so that it can perform the injection. We do this by
 * adding the services, resolvers and scalars to the providers
 * array of the @Module() decorator.
 *
 * @export
 * @class DrawingsModule
 */
@Module({
  providers: [
    DrawingService,
    DrawingActionService,
    ItemService,
    DrawingResolver,
    DrawingActionResolver,
    ItemResolver,
    DateScalar,
  ],
})
export class DrawingsModule {}

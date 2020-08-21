import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { DrawingActionResolver } from './resolvers/drawing-action.resolver';
import { DrawingResolver } from './resolvers/drawing.resolver';
import { ItemResolver } from './resolvers/item.resolver';
import { DrawingActionService } from './services/drawing-action.service';
import { DrawingService } from './services/drawing.service';
import { ItemService } from './services/item.service';

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

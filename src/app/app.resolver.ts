import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver('App')
export class AppResolver {
  constructor(private appService: AppService) {}

  @Query((returns) => Boolean)
  isOnline(): boolean {
    return this.appService.isOnline();
  }
}

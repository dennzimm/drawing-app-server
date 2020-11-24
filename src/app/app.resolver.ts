import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

/**
 * The AppResolver provides only one operation: isOnline.
 * This operation can be used to check whether the server is reachable.
 *
 * Resolvers provide the instructions for turning a GraphQL operation
 * (a query, mutation, or subscription) into data. They return the same
 * shape of data we specify in our schema -- either synchronously or as a
 * promise that resolves to a result of that shape.
 *
 * (see https://docs.nestjs.com/graphql/resolvers)
 *
 * @export
 * @class AppResolver
 */
@Resolver()
export class AppResolver {
  constructor(private appService: AppService) {}

  /**
   * This operation can be used to check whether the server is reachable.
   *
   * @return {*}  {boolean}
   * @memberof AppResolver
   */
  @Query((returns) => Boolean)
  isOnline(): boolean {
    return this.appService.isOnline();
  }
}

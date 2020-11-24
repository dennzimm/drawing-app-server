import { Injectable } from '@nestjs/common';

/**
 * The AppService provides only one method: isOnline.
 * In general, the business logic of resolvers is outsourced to service classes.
 *
 * @export
 * @class AppService
 */
@Injectable()
export class AppService {
  /**
   * This method can be used to check whether the server is reachable.
   *
   * @return {*}  {boolean}
   * @memberof AppService
   */
  isOnline(): boolean {
    return true;
  }
}

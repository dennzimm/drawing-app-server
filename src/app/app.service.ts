import { Injectable } from '@nestjs/common';

/**
 * The AppService provides only one method: isOnline.
 * The business logic of the AppResolver is outsourced to this service class.
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

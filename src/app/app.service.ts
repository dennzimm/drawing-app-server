import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isOnline(): boolean {
    return true;
  }
}

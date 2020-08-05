import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isAppOnline(): boolean {
    return true;
  }
}

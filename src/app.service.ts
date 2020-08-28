import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthz(): object {
    return { status: 'UP' };
  }
}

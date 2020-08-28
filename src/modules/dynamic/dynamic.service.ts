import { Injectable, Inject } from '@nestjs/common';

import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class DynamicService {
  private readonly envConfig;

  constructor(@Inject('DYNAMIC_OPTIONS') private file: string) {
    const envFile = this.file;
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

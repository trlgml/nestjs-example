import { Injectable, Inject } from '@nestjs/common';
import { CACHE_CONNECTION_TOKEN } from '../../constants/system.constant';
import { KEYS } from '../../constants/cache.constant';

@Injectable()
export class PageService {
  constructor(
    @Inject(CACHE_CONNECTION_TOKEN) private readonly cache,
  ) { }

  async buildHome(): Promise<object[]> {
    const home = await this.cache.get(KEYS.HOME_HM);
    return home;
  }
}

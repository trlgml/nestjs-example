import { Injectable, Inject } from '@nestjs/common';
import { CACHE_CONNECTION_TOKEN, DB_CONNECTION_TOKEN } from '../../constants/system.constant';

@Injectable()
export class TestService {
  constructor(
    @Inject(CACHE_CONNECTION_TOKEN) private readonly cache,
    @Inject(DB_CONNECTION_TOKEN) private readonly db,
  ) { }
  async getCache() {
    let key = '__test__key'
    await this.cache.set(key, key)
    const story = await this.cache.get(key);
    return story;
  }
  async getSql() {
    const [story] = await this.db.query('SELECT * from photo')
    return story;
  }
}

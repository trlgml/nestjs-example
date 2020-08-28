/**
 * Cache module.
 * @file Cache 全局模块
 */

import { Module, Global } from '@nestjs/common';
import { cacheProvider } from './cache.provider';

@Global()
@Module({
  providers: [cacheProvider],
  exports: [cacheProvider],
})
export class CacheModule { }

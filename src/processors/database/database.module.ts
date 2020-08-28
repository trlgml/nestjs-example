/**
 * Database module.
 * @file Database 全局模块
 */

import { Module, Global } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { typeormProvider } from './typeorm.provider';

@Global()
@Module({
  providers: [databaseProvider, typeormProvider],
  exports: [databaseProvider, typeormProvider],
})
export class DatabaseModule { }

/**
 * Database providers.
 * @file Database 模块构造器
 */

import { createConnection } from 'typeorm';
import { TYPEORM_CONNECTION_TOKEN } from '../../constants/system.constant';
import { AppConfig } from '../../app.config';
const { mysql: { host, user, password, database } } = AppConfig.get()

export const typeormProvider = {
  provide: TYPEORM_CONNECTION_TOKEN,
  useFactory: async () => await createConnection({
    type: 'mysql',
    host,
    port: 3306,
    username: user,
    password,
    database,
    entities: [
      'src/**/*.entity{.ts,.js}',
    ],
    synchronize: false,
  }),
}


/**
 * Database providers.
 * @file Database 模块构造器
 */

import * as mysql from 'mysql2/promise';
import { DB_CONNECTION_TOKEN } from '../../constants/system.constant';
import { AppConfig } from '../../app.config';
const { mysql: { host, user, password, database } } = AppConfig.get()

export const databaseProvider = {
  inject: [],
  provide: DB_CONNECTION_TOKEN,
  useFactory: async () => {
    function connection() {
      return mysql.createPool({
        host,
        user,
        password,
        database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      })
    }
    return await connection();
  },
};

/**
 * Cache providers.
 * @file Cache 模块构造器
 */

import * as ioredis from 'ioredis';
import { CACHE_CONNECTION_TOKEN } from '../../constants/system.constant';
import { AppConfig } from '../../app.config';
const { redis: { host, port }, enableRedisCluster } = AppConfig.get()

export const cacheProvider = {
  inject: [],
  provide: CACHE_CONNECTION_TOKEN,
  useFactory: async () => {
    const clusterClient = () => new ioredis.Cluster([{
      host,
      port,
    }]);

    const forkClient = () => new ioredis({
      host,
      port,
    });

    const client = enableRedisCluster === 0 ? forkClient() : clusterClient();

    client.on('error', (err) => {
      console.error('[redis] client error: %s', err);
    });

    return client;
  },
};

import * as dotenv from 'dotenv';
import * as convict from 'convict';
import * as fs from 'fs';

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const [k, v] of Object.entries(envConfig)) {
  process.env[k] = v;
}

export const AppConfig = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'staging', 'test'],
    default: 'staging',
    env: 'NODE_ENV',
  },

  port: {
    doc: 'The port to bind',
    format: 'port',
    default: 3000,
    env: 'PORT',
  },

  mysql: {
    host: {
      default: '127.0.0.1',
      format: String,
      env: 'MYSQL_URI',
    },
    user: {
      default: 'root',
      format: String,
      env: 'USERNAME',
    },
    password: {
      default: 'root',
      format: String,
      env: 'PASSWORD',
    },
    database: {
      default: 'NEST_DATABASE',
      format: String,
      env: 'DATABASE',
    },
  },

  redis: {
    port: {
      default: 6379,
      format: Number,
      env: 'REDIS_PORT',
    },
    host: {
      default: '127.0.0.1',
      format: String,
      env: 'REDIS_HOST',
    },
  },

  enableRedisCluster: {
    default: 0,
    format: Number,
    env: 'ENABLE_REDIS_CLUSTER',
  },
});

AppConfig.validate({ allowed: 'strict' });


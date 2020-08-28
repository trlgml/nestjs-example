/**
 * App env.
 * @file Env 环境配置
 */
import { AppConfig } from './app.config';
const { env } = AppConfig.get()
export const isDevMode = Object.is(env, 'staging');
export const isProdMode = Object.is(env, 'production');
export const isTestMode = Object.is(env, 'test');

export default {
  isDevMode,
  isProdMode,
  isTestMode,
};

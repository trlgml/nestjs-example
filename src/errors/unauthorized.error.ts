/**
 * HttpUnauthorized error.
 * @file 401 错误生成器
 */

import { UnauthorizedException } from '@nestjs/common';

export class HttpUnauthorizedError extends UnauthorizedException {
  constructor(message?: string, error?: any) {
    super(message || '权限验证失败', error);
  }
}

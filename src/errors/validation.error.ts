/**
 * Validation error.
 * @file 400 错误生成器
 */

import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationError extends HttpException {
  constructor(error?: any) {
    super(error || '参数验证失败', HttpStatus.BAD_REQUEST);
  }
}

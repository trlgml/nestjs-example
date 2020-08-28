/**
 * Transform interceptor.
 * @file 请求响应流拦截器
 */

import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { HttpSuccessResponse, EHttpStatus } from '../interfaces/http.interface';


@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, HttpSuccessResponse<T>> {

  constructor(
    private readonly reflector: Reflector
  ) { }

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<HttpSuccessResponse<T>> {
    const call$ = next.handle();
    // getHandler()为我们提供了对路由处理程序函数的引用。
    const target = context.getHandler();
    const message = this.reflector.get<string>('__customHttpMessage__', target) || '数据请求成功';

    return call$.pipe(map((data: any) => {
      // return data
      return { status: EHttpStatus.Success, message, result: data || {} };
    }));
  }
}

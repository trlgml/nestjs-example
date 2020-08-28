/**
 * Error interceptor.
 * @file 请求错误拦截器
 */

import { Reflector } from '@nestjs/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { CustomError } from '../errors/custom.error';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {

  constructor(
    private readonly reflector: Reflector
  ) { }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const call$ = next.handle();
    const target = context.getHandler();
    const message = this.reflector.get<string>('__customHttpErrorMessage__', target) || '数据请求失败';
    return call$.pipe(
      catchError(error => throwError(new CustomError({ message, error }, 500))),
    );
  }
}


// 类
// @Controller('/app')
// @UseInterceptors(new ErrorInterceptor())  
// export class AppController { }

// 类方法
// @Controller('/app')
// export class AppController {
// 	@UseInterceptors(new ErrorInterceptor()) 
// 	@Get()
// 	public getHello(): string {
// 		return 'hello';
// 	}
// }

// 全局
// app.useGlobalInterceptors(new ErrorInterceptor());

// 模块
// import { APP_INTERCEPTOR } from '@nestjs/core';
// @Module({
// 	providers:[
// 	 	{
//            provide: APP_INTERCEPTOR,
//            useClass: ErrorInterceptor,
//         },
// 	]
// })
// export class ChildModule{ }
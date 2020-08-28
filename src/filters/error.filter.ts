/**
 * HttpException filter.
 * @file 全局异常过滤器
 */

import * as lodash from 'lodash';
import { isDevMode } from '../app.environment';
import { EHttpStatus, HttpErrorResponse, ExceptionOption } from '../interfaces/http.interface';
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { CustomError } from '../errors/custom.error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // exception：保存了http请求异常的message异常信息、status状态码的参数
  // host：也是一个对象，存储了request，response，next等数据的switchToHttp参数和其它一些属性
  catch(exception: HttpException, host: ArgumentsHost) {
    if (!(exception instanceof HttpException)) {
      exception = new CustomError({ message: '未预料的错误', error: exception }, 500)
    }
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorOption: ExceptionOption = exception.getResponse() as ExceptionOption;
    const isString = (value): value is string => lodash.isString(value);
    const errMessage = isString(errorOption) ? errorOption : errorOption.message;
    const errorInfo = isString(errorOption) ? null : errorOption.error;
    const parentErrorInfo = errorInfo ? String(errorInfo) : null;
    const isChildrenError = errorInfo && errorInfo.status && errorInfo.message;
    const resultError = isChildrenError && errorInfo.message || parentErrorInfo;
    const resultStatus = isChildrenError ? errorInfo.status : status;
    const data: HttpErrorResponse = {
      status: EHttpStatus.Error,
      message: errMessage,
      error: resultError,
      debug: isDevMode ? exception.stack : null,
    };
    // 对默认的 404 进行特殊处理
    if (status === HttpStatus.NOT_FOUND) {
      data.error = `资源不存在`;
      data.message = `接口 ${request.method} -> ${request.url} 无效`;
    }
    return response.status(resultStatus).jsonp(data);
  }
}


// 类
// @Controller('/app')
// @UseFilters(new HttpExceptionFilter()) 
// export class AppController { }

// 类方法
// @Controller('/app')
// export class AppController {
//   @UseFilters(new HttpExceptionFilter())
//   @Get()
//   public getHello(): string {
//     return 'hello';
//   }
// }

// 全局
// app.useGlobalFilters(new HttpExceptionFilter());

// 模块
// import { APP_FILTER } from '@nestjs/core';;
// @Module({
// 	providers:[
// 	 	{
//            provide: APP_FILTER,
//            useClass: AuthGuard,
//         },
// 	]
// })
// export class ChildModule{ }
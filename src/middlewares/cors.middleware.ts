/**
 * Cors middleware.
 * @file CORS 中间件
 */

import { Request, Response } from 'express';
import { Injectable, NestMiddleware, HttpStatus, RequestMethod } from '@nestjs/common';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next) {
    const getMethod = method => RequestMethod[method];

    const allowedHeaders = [
      'Authorization',
      'Origin',
      'No-Cache',
      'If-Modified-Since',
      'Pragma',
      'Last-Modified',
      'Cache-Control',
      'Expires',
      'Content-Type',
    ];

    response.header('Access-Control-Allow-Headers', allowedHeaders.join(','));
    response.header('Access-Control-Allow-Methods', '*');
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Max-Age', '1728000');
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.header('X-Powered-By', `1.1.1`);

    if (request.method === getMethod(RequestMethod.OPTIONS)) {
      return response.sendStatus(HttpStatus.NO_CONTENT);
    } else {
      return next();
    }
  }
}


//  全局
// app.use(CorsMiddleware);

// 模块
// export class ChildModule implements NestModule { // 实现NestModule接口，从而配置中间件
//   // MiddlewareConsumer是一个帮助类。它提供了几种内置方法来管理中间件
//   public configure(consumer: MiddlewareConsumer) {
//     consumer.apple(...arg) // 使用中间件，接收一个0-n个参数，参数为每一个中间件，并且顺序执行的多个中间件
//       .exclude({ path: 'user', method: RequestMethod.ALL }) // 接收0-n个排除的对象，排除哪个路由，那种请求方式不需要使用中间件
//       // path: 'user', method: RequestMethod.ALL表示除了/user里面的全部请求方式之外的全部路由都使用中间件
//       .forRoutes('*'); //表示应用了全局的路由，除了exclude之外
//     // .forRoutes('/user/*');表示应用于/user/*的路由
//     // forRoutes里面也可以接受一个和exclude需要的对象一致的参数，也可以直接放入一个控制器
//   }
// }

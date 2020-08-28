import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { HttpUnauthorizedError } from '../errors/unauthorized.error';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const request = context.switchToHttp().getRequest();
    // return validateRequest(request);
    // throw new HttpUnauthorizedError();
    return true
  }
}

// 类
// @Controller('/app')
// @UseGuards(new AuthGuard()) 
// export class AppController { }

// 类方法
// @Controller('/app')
// export class AppController {
// 	@UseGuards(new AuthGuard()) 
// 	@Get()
// 	public getHello(): string {
// 		return 'hello';
// 	}
// }

// 全局
// app.useGlobalGuards(new AuthGuard());

// 模块
// import { APP_GUARD } from '@nestjs/core';
// @Module({
// 	providers:[
// 	 	{
//            provide: APP_GUARD,
//            useClass: AuthGuard,
//         },
// 	]
// })
// export class ChildModule{ }
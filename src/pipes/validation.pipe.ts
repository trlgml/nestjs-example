import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationError } from '../errors/validation.error';

// plainToClass:类转换器函数plainToClass()将我们的普通JavaScript参数对象转换为类型化对象，以便我们可以应用验证。
// validate(class-validator自带验证器)验证是否一致，不一致则抛出异常,error存在的情况下，不一致，error为null的情况下表示验证通过

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  public async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorMessage = errors.map(error => Object.values(error.constraints).join(';')).join(';');
      throw new ValidationError(errorMessage);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}


// 类
// @Controller('/app')
// @UsePipes(new ValidationPipe())
// export class AppController { }

// 类方法
// @Controller('/app')
// export class AppController {
// 	@UsePipes(new ValidationPipe()) 
// 	@Get()
// 	public getHello(): string {
// 		return 'hello';
// 	}
// }

// 全局
// app.useGlobalPipes(new ValidationPipe());

// 模块
// import { APP_PIPE } from '@nestjs/core';
// @Module({
// 	providers:[
// 	 	{
//            provide: APP_PIPE,
//            useClass: AuthGuard,
//         },
// 	]
// })
// export class ChildModule{ }
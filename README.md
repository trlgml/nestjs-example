
## 目录说明

- 入口

  * `main.ts`：引入配置，启动主程序，引入各种全局服务
  * `app.module.ts`：主程序根模块，负责各业务模块的聚合
  * `app.controller.ts`：主程序根控制器
  * `app.service.ts`: 主程序根服务
  * `app.config.ts`：配置文件
  * `app.environment.ts：`全局环境变量

- 目录

  * `constants`：系统常量
  * `decorators`：自定义的装饰器
  * `errors`: 自定义的错误状态
  * `filters`：异常处理
  * `guards`：自定义的守卫
  * `interceptors`: 自定义的注入器
  * `interfaces`：接口
  * `middlewares`：自定义中间件
  * `modules`: 应用模块
  * `pipes`：管道
  * `processors`：三方库连接
  * `transforms`：转换工具

- 环境变量

  `.env` 

- 请求处理流程

  1. `request`：收到请求
  2. `middleware`：中间件过滤（跨域、来源校验等处理）
  3. `guard`：守卫过滤（鉴权）
  4. `interceptor:before`：数据流拦截器
  5. `pipe`：参数提取（校验）器
  6. `controller`：业务控制器
  7. `service`：业务服务
  8. `interceptor:after`：数据流拦截器（格式化数据、错误）
  9. `filter`：捕获以上所有流程中出现的异常，如果任何一个环节抛出异常，则返回错误
  
## 安装

```bash
$ yarn
```

## 运行

```bash
# staging
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### 公共前缀 

`v2`

### 接口文档位置
> swagger自动生成
`http://localhost:3000/api`

## 文档
[英文文档](https://docs.nestjs.com/)

[中文文档](https://docs.nestjs.cn/)

[typeorm 中文文档](https://typeorm.io/)

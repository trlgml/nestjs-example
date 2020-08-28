import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { CreateBodyDto } from './test.dto'
import { TestService } from './test.service'
import { User } from '../../decorators/user.decorator'
import { Handle } from '../../decorators/http.decorator';
import { ApiUseTags, ApiImplicitParam, ApiImplicitQuery } from '@nestjs/swagger';

@ApiUseTags('test')
@Controller('test')
export class TestController {
  constructor(
    private readonly testService: TestService
  ) { }
  @ApiImplicitParam({
    name: 'id',
    description: '这是用户id',
  })
  @ApiImplicitQuery({
    name: 'name',
    description: '这是需要传递的参数',
  })
  @Get('swagger/:id')
  testSwagger(@Param() param, @Body() body, @Query() query) {
    return {
      param,
      body,
      query,
    }
  }
  @Get('cache')// 获取缓存数据，在server处理
  testCache() {
    return this.testService.getCache()
  }
  @Get('sql')// 获取db数据，在server处理
  testSql() {
    return this.testService.getSql()
  }
  @Post('pipe')// 数据格式验证，已经在全局处理，CreateBodyDto处理验证规则
  testPipe(@Body() body: CreateBodyDto) {
    return body
  }
  @Get('guard')// 权限验证，已经在全局处理，默认全部通过
  testGuard() {
    return 'guard'
  }
  @Get('decorator')
  @Handle('测试装饰器')// @Handle添加需要的数据到元数据中  @User处理重复处理的数据
  testDecorator(@User() user: String) {
    return user
  }
}

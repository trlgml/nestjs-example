import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data: string, req: any) => {
  const story = {
    id: 'ca333ff2e2b2cea33',
    username: 'name',
    password: '123456'
  }
  // 有参数获取指定值，无参数返回全部
  const value = data ? story[data] : story;
  return value;
});
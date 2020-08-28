import { Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginBodyDto {
  @Length(3, 10, {
    message: '用户名的长度在3到10个字符之间',
  })
  @ApiModelProperty({
    description: '用户名',
  })
  public readonly username: string;
  @Length(5, 16, {
    message: '密码的长度在6到16个字符之间',
  })
  @ApiModelProperty({
    description: '密码',
  })
  public readonly password: string;
}
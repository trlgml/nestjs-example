import { Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBodyDto {
  @Length(3, 10, {
    message: '长度在3到10个字符之间',
  })
  @ApiModelProperty({
    description: '测试字段',
  })
  public readonly test: string;
}
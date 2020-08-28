import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { TypeormService } from './typeorm.service'
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('typeorm')
@Controller('typeorm')
export class TypeormController {
  constructor(
    private readonly typeormService: TypeormService
  ) { }
  @Get()
  get() {
    return this.typeormService.getSql()
  }
  @Post()
  set() {
    return this.typeormService.setSql()
  }
  @Delete()
  del() {
    return this.typeormService.delSql()
  }
  @Put()
  update() {
    return this.typeormService.updateSql()
  }
}
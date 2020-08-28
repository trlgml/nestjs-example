import { Module } from '@nestjs/common';
import { TypeormController } from './typeorm.controller';
import { TypeormService } from './typeorm.service';
import { PhotoProvider } from './photo.entity';

@Module({
  controllers: [TypeormController],
  providers: [PhotoProvider, TypeormService],
  exports: [TypeormService]
})
export class TypeormModule { }

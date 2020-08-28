import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      // 1. 直接useFactory配置
      // useFactory: () => ({
      //     dest: './uploadFile',
      // }),
      // 服务配置
      useClass: UploadService,
    }),
  ],
  controllers: [UploadController],
  providers: []
})
export class UploadModule { }

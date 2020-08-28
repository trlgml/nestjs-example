import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { UPLOAD_FILE_DIR } from '../../constants/system.constant'
import * as fs from 'fs'
if (!fs.existsSync(UPLOAD_FILE_DIR)) {
  fs.mkdirSync(UPLOAD_FILE_DIR);
}

@Injectable()
export class UploadService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      // fileFilter:配置过滤，可以阻止文件上传
      // dest: './uploadFile',
      fileFilter(req: Request, file: any, cb: (error: Error, acceptFile: boolean) => void): void {
        // 需要调用回调函数 `cb`，
        // 并在第二个参数中传入一个布尔值，用于指示文件是否可接受
        // 如果要拒绝文件，上传则传入 `false`。如:
        // cb(null, false);
        // 如果接受上传文件，则传入 `true`。如:
        cb(null, true);
        // 出错后，可以在第一个参数中传入一个错误：
        // cb(new Error('I don\'t have a clue!'));
        // console.log(file.filename);
        // cb(null, false);
      },
      // storge:比dest的好处是，可以配置一个multer的diskStorage，可以让上传的文件拥有文件名和文件后缀
      storage: diskStorage({
        // destination:就是对应的文件路径
        destination: (req, file, cb) => {
          cb(null, './uploadFile');
        },
        // filename:就是对应的文件名和文件后缀的设置
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    };
  }
}
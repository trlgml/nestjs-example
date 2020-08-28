import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiUseTags, ApiImplicitFile } from '@nestjs/swagger';

@ApiUseTags('upload')
@Controller('upload')
export class UploadController {
  /**  单个文件上传 */
  @Post('/one')
  @ApiImplicitFile({
    name: 'file',
    description: '上传头像',
    required: true,
  })
  // FileInterceptor()采用两个参数，一个fieldName（从保持一个文件的HTML表单指向场）和可选的options对象。这些MulterOptions等同于传递给multer构造函数
  @UseInterceptors(FileInterceptor('file', { // FileInterceptor 第二个参数的storage 可以配置文件的保存文件名等
    // storage: diskStorage({
    //     // destination: (req, file, cb) => {
    //     //     cb(null, '/Users/liu/Desktop/test/');
    //     // },
    //     filename: (req, file, cb) => {
    //         cb(null, file.originalname);
    //     },
    // }),
  }))
  public uploadFile(@UploadedFile() file: any): any {
    console.log(file);
    return file;
    // return 'file 对应参数名的单个文件上传';
  }

  @Post('/many')
  @ApiImplicitFile({
    name: 'files',
    description: '上传头像',
    required: true,
  })
  // 为了上传文件数组，我们使用FilesInterceptor()。这个拦截器有三个参数。fieldName（保持不变），maxCount即可以同时上载的最大文件数，以及可选MulterOptions对象。
  @UseInterceptors(FilesInterceptor('files', 10))
  public uploadFileArray(@UploadedFiles() files: any): any {
    console.log(files);
    return files;
  }

  @Post('/manyFiles')
  @ApiImplicitFile({
    name: 'avatar',
    description: '上传头像',
    required: true,
  })
  @ApiImplicitFile({
    name: 'background',
    description: '背景',
    required: true,
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 3 },
    { name: 'background', maxCount: 1 },
  ]))
  public uploadFiles(@UploadedFiles() files: any): any {
    console.log(files);
    // return 'files 不同参数名的多个文件';
    return files;
  }

  @Post('/any')
  @ApiImplicitFile({
    name: 'file',
    description: '上传头像',
    required: true,
  })
  @UseInterceptors(AnyFilesInterceptor())
  public anyUploadFile(@UploadedFiles() files) {
    console.log(files);
    // return 'files 任何文件';
    return files;
  }
}

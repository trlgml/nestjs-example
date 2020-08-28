import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { DatabaseModule } from './processors/database/database.module';
import { CacheModule } from './processors/cache/cache.module';

import { PageModule } from './modules/page/page.module';
import { TestModule } from './modules/test/test.module';
import { UploadModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeormModule } from './modules/typeorm/typeorm.module';
// import { DynamicModule } from './modules/dynamic/dynamic.module';

@Module({
  imports: [
    // DynamicModule.register('.env'),
    DatabaseModule,
    CacheModule,

    PageModule,
    TestModule,
    UploadModule,
    AuthModule,
    TypeormModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}

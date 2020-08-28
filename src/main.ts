import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { AppConfig } from './app.config';

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/error.filter';
import { AuthGuard } from './guards/auth.guard';
import { isProdMode } from './app.environment';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ValidationPipe } from './pipes/validation.pipe';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const { port, env } = AppConfig.get()

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    isProdMode ? { logger: false } : null,
  );
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.setGlobalPrefix('v2');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(
    new TransformInterceptor(new Reflector()),
    new ErrorInterceptor(new Reflector()),
    new LoggingInterceptor(),
  );

  const options = new DocumentBuilder()
    .setTitle('接口标题')
    .setDescription('文档介绍')
    .setVersion('2.0.0')
    .addBearerAuth()
    .setBasePath('/v2')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);
  await app.listen(port);
}
bootstrap().then(() => {
  console.info(`WEB Run！port at ${port}, env: ${env}`);
});

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('healthz')
@Controller('healthz')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): object {
    return this.appService.getHealthz();
  }
}

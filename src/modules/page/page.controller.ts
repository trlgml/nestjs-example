import { Controller, Get } from '@nestjs/common';
import { PageService } from './page.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('page')
@Controller('page')
export class PageController {
  constructor(
    private readonly pageService: PageService
  ) { }

  @Get('home')
  home() {
    return this.pageService.buildHome()
  }
}

import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { AuthService } from './auth.service';
import { ApiUseTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { LoginBodyDto } from './auth.dto';

@ApiUseTags('auth')
@Controller('/auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) { }

  @Post('/login')
  public async login(@Body() body: LoginBodyDto): Promise<{ token: string }> {
    return this.authService.login(body);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: '权限不足' })
  @UseGuards(JwtAuthGuard)
  @Get('check')
  public check(@Request() req): any {
    return req.user;
  }
}

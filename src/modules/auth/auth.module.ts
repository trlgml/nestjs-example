import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWT_TOKEN_SECRET, JWT_EXPIRES_IN, JWT_DEFAULT_STRATEGY } from '../../constants/system.constant';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: JWT_DEFAULT_STRATEGY/*, session: true */ }),
    JwtModule.register({
      secret: JWT_TOKEN_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }

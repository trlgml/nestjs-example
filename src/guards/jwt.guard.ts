import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { HttpUnauthorizedError } from '../errors/unauthorized.error';
import { JWT_DEFAULT_STRATEGY } from '../constants/system.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_DEFAULT_STRATEGY) {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(error, authInfo, errInfo) {
    if (authInfo && !error && !errInfo) {
      return authInfo;
    } else {
      throw error || new HttpUnauthorizedError(null, errInfo && errInfo.message);
    }
  }
}

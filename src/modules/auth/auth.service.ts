import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(payload: any): Promise<any> {
    const { username, password } = payload
    if ('admin' === password && 'admin' === username) {
      return { username };
    }
    return null;
  }

  async login(user: any): Promise<{ token: string }> {
    const { username, password } = user
    if ('admin' === password && 'admin' === username) {
      return Promise.resolve({ // authorization添加请求头
        token: `Bearer ${this.jwtService.sign({ username, password })}`,
      });
    } else {
      return Promise.reject('密码不匹配')
    }
  }
}

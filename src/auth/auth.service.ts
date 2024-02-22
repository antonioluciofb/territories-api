import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePassword } from 'utils/password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByName(username);
    if (user && (await comparePassword(pass, user.password))) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      ...user._doc,
    };

    payload.password = undefined;

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserRootMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    if (req.route.path.includes('users')) return next();

    const token = req.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token);

    if (decoded['isRoot'] !== true) {
      throw new UnauthorizedException();
    }

    next();
  }
}

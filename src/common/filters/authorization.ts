import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class Authorization implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      '🚀 ~ file: authorization.ts:7 ~ Authorization ~ use ~ req:',
      req,
    );
    console.log('Request...');
    next();
  }
}

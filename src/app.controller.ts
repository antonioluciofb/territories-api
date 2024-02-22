import { Controller, Get } from '@nestjs/common';
import baseAPI from './constants/baseApiUrl';

@Controller(`${baseAPI}`)
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return JSON.stringify({
      message: 'Hello World!',
    });
  }
}

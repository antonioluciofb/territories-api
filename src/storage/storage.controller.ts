import { Controller, Get, Param } from '@nestjs/common';
import baseAPI from 'constants/baseApiUrl';
import { StorageService } from './storage.service';

@Controller(`${baseAPI}/storage`)
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('/getCardImage/:key')
  serveFile(@Param('key') key: string) {
    return this.storageService.serveFile(key);
  }
}

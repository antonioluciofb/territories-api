import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import baseAPI from 'constants/baseApiUrl';
import { TerritorialClosureService } from './territorial-closure.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller(`${baseAPI}/territorial-closure`)
export class TerritorialClosureController {
  constructor(
    private readonly territorialClosureService: TerritorialClosureService,
  ) {}

  @Get()
  findAll() {
    return this.territorialClosureService.findAll();
  }

  @Post()
  create() {
    return this.territorialClosureService.create();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.territorialClosureService.delete(id);
  }
}

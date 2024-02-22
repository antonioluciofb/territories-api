import baseAPI from '../constants/baseApiUrl';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCardDTO } from './dtos/create-card';
import { CardsService } from './cards.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller(`${baseAPI}/cards`)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDTO: CreateCardDTO) {
    return this.cardsService.create(createCardDTO);
  }

  @Get()
  findAll(@Query('status') status: 'inProgress' | 'finished') {
    if (status === 'inProgress') {
      return this.cardsService.findAllInProgress();
    }

    if (status === 'finished') {
      return this.cardsService.findAllFinished();
    }

    return this.cardsService.findAll();
  }

  @Get('/getImage/:id')
  getImage(@Param('id') id: string) {
    return this.cardsService.getFileCard(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cardsService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createCardDTO: CreateCardDTO) {
    return this.cardsService.update(id, createCardDTO);
  }
}

import baseAPI from '../constants/baseApiUrl';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateRecordDTO } from './dtos/create-record';
import { RecordsService } from './records.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { EditRecordDTO } from './dtos/edit-record';

@UseGuards(JwtAuthGuard)
@Controller(`${baseAPI}/records`)
export class RecordsController {
  constructor(private readonly recordService: RecordsService) {}

  @Post()
  create(@Body() createCardDTO: CreateRecordDTO) {
    return this.recordService.create(createCardDTO);
  }

  @Put(':id')
  edit(@Param('id') id: string, @Body() editRecordDTO: EditRecordDTO) {
    return this.recordService.update(id, editRecordDTO);
  }

  @Get()
  findAll() {
    return this.recordService.findAll();
  }
}

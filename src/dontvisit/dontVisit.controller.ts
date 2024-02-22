import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DontVisitService } from './dontVisit.service';
import { DontVisit } from './interfaces/dontVisit.interface';
import { CreateDontVisitDTO } from './dtos/create-dontVisit';
import { UpdateDontVisitDTO } from './dtos/update-dontVisit';

@Controller('dontvisit')
export class DontVisitController {
  constructor(private readonly dontvisitService: DontVisitService) {}

  @Get()
  async findAll(): Promise<DontVisit[]> {
    return await this.dontvisitService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.dontvisitService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDontVisitDTO: UpdateDontVisitDTO,
  ) {
    return this.dontvisitService.update(id, updateDontVisitDTO);
  }

  @Post()
  async create(@Body() dontVisit: CreateDontVisitDTO): Promise<DontVisit> {
    return await this.dontvisitService.create(dontVisit);
  }
}

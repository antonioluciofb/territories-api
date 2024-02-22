import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import baseAPI from 'constants/baseApiUrl';
import { DesignatedService } from './designated.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { CreateDesignatedDTO } from './dtos/create-designated';
import { UpdateDesignatedDTO } from './dtos/update-designated';

@Controller(`${baseAPI}/designated`)
export class DesignatedController {
  constructor(private readonly designatedService: DesignatedService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDTO: CreateDesignatedDTO) {
    return this.designatedService.create(createUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.designatedService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(id: string) {
    return this.designatedService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDontVisitDTO: UpdateDesignatedDTO,
  ) {
    return this.designatedService.update(id, updateDontVisitDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.designatedService.delete(id);
  }
}

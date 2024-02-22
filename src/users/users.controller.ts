import baseAPI from '../constants/baseApiUrl';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'auth/auth.service';
import { CreateUserDTO } from './dtos/create-user';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Controller(`${baseAPI}/users`)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}

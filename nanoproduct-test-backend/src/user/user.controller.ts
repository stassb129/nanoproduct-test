import {Controller, Get, Post, Body, Patch, Param, Delete, Put} from '@nestjs/common';
import { UserService } from './user.service';
import {User} from "./entities/user.model";
import {CreateUserDto, DeleteUserDto, UpdateUserDto} from "./dto/user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(
      @Param('id') id: string,
      @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') {id}: DeleteUserDto): Promise<User> {
    return this.userService.delete(id);
  }
}

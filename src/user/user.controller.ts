import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseAuth } from 'src/auth/decorators/use-auth.decorators';
import { AppRequest } from 'src/shared/types/app-request.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseAuth()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseAuth()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseAuth()
  update(@Req() req: AppRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }
}

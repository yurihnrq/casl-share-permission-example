import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { AppRequest } from 'src/shared/types/app-request.interface';
import { UseAuth } from 'src/auth/decorators/use-auth.decorators';

@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  @UseAuth()
  create(@Body() createFarmDto: CreateFarmDto, @Req() req: AppRequest) {
    return this.farmService.create(createFarmDto, req.user.id);
  }

  @Get()
  @UseAuth()
  findAll() {
    return this.farmService.findAll();
  }

  @Get(':id')
  @UseAuth()
  findOne(@Param('id') id: string) {
    return this.farmService.findOne(+id);
  }

  @Patch(':id')
  @UseAuth()
  update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmService.update(+id, updateFarmDto);
  }

  @Delete(':id')
  @UseAuth()
  remove(@Param('id') id: string) {
    return this.farmService.remove(+id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class FarmService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFarmDto: CreateFarmDto, userId: number) {
    return this.prisma.farm.create({
      data: {
        ...createFarmDto,
        createdById: userId,
      },
    });
  }

  findAll() {
    return this.prisma.farm.findMany();
  }

  findOne(id: number) {
    return this.prisma.farm.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateFarmDto: UpdateFarmDto) {
    return this.prisma.farm.update({
      where: {
        id,
      },
      data: updateFarmDto,
    });
  }

  remove(id: number) {
    return this.prisma.farm.delete({
      where: {
        id,
      },
    });
  }
}

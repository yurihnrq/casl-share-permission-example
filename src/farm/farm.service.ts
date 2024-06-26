import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { PrismaService } from 'src/shared/services/prisma.service';
import {
  AppAbility,
  UserAction,
} from 'src/casl/casl-ability.factory/casl-ability.factory';
import { accessibleBy } from '@casl/prisma';
import { ShareFarmDto } from './dto/share-farm.dto';

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

  findAll(ability: AppAbility) {
    return this.prisma.farm.findMany({
      where: accessibleBy(ability, UserAction.READ).Farm,
    });
  }

  findOne(id: number, ability: AppAbility) {
    return this.prisma.farm.findUnique({
      where: {
        ...accessibleBy(ability, UserAction.READ).Farm,
        id,
      },
    });
  }

  update(id: number, updateFarmDto: UpdateFarmDto, ability: AppAbility) {
    return this.prisma.farm.update({
      where: {
        ...accessibleBy(ability, UserAction.EDIT).Farm,
        id,
      },
      data: updateFarmDto,
    });
  }

  remove(id: number, ability: AppAbility) {
    return this.prisma.farm.delete({
      where: {
        ...accessibleBy(ability, UserAction.ALL).Farm,
        id,
      },
    });
  }

  async shareWithUser(
    id: number,
    shareFarmDto: ShareFarmDto,
    ability: AppAbility,
  ) {
    try {
      await this.prisma.farm.findUniqueOrThrow({
        where: {
          ...accessibleBy(ability, UserAction.ALL).Farm,
          id,
        },
      });
    } catch (error) {
      throw new UnauthorizedException(
        "You don't have permission to share this farm",
      );
    }

    return this.prisma.userFarm.create({
      data: {
        farmId: id,
        userId: shareFarmDto.userId,
        permission: shareFarmDto.permission,
      },
    });
  }
}

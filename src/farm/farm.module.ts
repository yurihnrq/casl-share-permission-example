import { Module } from '@nestjs/common';
import { FarmService } from './farm.service';
import { FarmController } from './farm.controller';
import { PrismaService } from 'src/shared/services/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  controllers: [FarmController],
  providers: [FarmService, PrismaService],
  imports: [AuthModule, CaslModule],
})
export class FarmModule {}

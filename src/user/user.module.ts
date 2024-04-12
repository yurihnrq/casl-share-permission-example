import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/shared/services/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [AuthModule, CaslModule],
})
export class UserModule {}

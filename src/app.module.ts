import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FarmModule } from './farm/farm.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, FarmModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

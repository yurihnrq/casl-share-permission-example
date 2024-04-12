import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FarmModule } from './farm/farm.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [UserModule, FarmModule, AuthModule, CaslModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

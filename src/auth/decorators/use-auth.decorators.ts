import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

export function UseAuth() {
  return applyDecorators(UseGuards(AuthGuard));
}

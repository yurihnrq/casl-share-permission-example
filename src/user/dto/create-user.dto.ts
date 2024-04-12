import { User } from '@prisma/client';
import { UserPermission } from '../types/user-permission.enum';

export class CreateUserDto implements Omit<User, 'id'> {
  name: string;
  email: string;
  password: string;
  permission: UserPermission;
}

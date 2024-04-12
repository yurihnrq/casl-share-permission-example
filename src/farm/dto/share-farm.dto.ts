import { UserFarmPermission } from '../types/farm-permission.enum';

export class ShareFarmDto {
  userId: number;
  permission: UserFarmPermission;
}

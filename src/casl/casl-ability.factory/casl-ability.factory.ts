import { AbilityBuilder, PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects, createPrismaAbility } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Farm, User } from '@prisma/client';
import { UserFarmPermission } from 'src/farm/types/farm-permission.enum';

export enum UserAction {
  CREATE = 'create',
  READ = 'read',
  EDIT = 'edit',
  DELETE = 'delete',
  ALL = 'all',
}

export type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
      Farm: Farm;
    }>,
  ],
  PrismaQuery
>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    can(UserAction.READ, 'User', { id: user.id });
    can(UserAction.EDIT, 'User', { id: user.id });
    can(UserAction.DELETE, 'User', { id: user.id });

    can(UserAction.READ, 'Farm', {
      OR: [
        {
          createdById: user.id,
        },
        {
          farmUsers: {
            some: {
              userId: user.id,
              permission: {
                in: [
                  UserFarmPermission.READ,
                  UserFarmPermission.EDIT,
                  UserFarmPermission.ALL,
                ],
              },
            },
          },
        },
      ],
    });
    can(UserAction.EDIT, 'Farm', {
      OR: [
        {
          createdById: user.id,
        },
        {
          farmUsers: {
            some: {
              userId: user.id,
              permission: {
                in: [UserFarmPermission.EDIT, UserFarmPermission.ALL],
              },
            },
          },
        },
      ],
    });
    can(UserAction.ALL, 'Farm', {
      OR: [
        {
          createdById: user.id,
        },
        {
          farmUsers: {
            some: {
              userId: user.id,
              permission: UserFarmPermission.ALL,
            },
          },
        },
      ],
    });

    return build();
  }
}

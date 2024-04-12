import { Request } from 'express';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';

export interface AppRequest extends Request {
  user: {
    id: number;
    email: string;
    name: string;
    permission: number;
    ability: AppAbility;
  };
}

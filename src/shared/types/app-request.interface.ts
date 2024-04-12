import { Request } from 'express';

export interface AppRequest extends Request {
  user: {
    id: number;
    email: string;
    name: string;
    permission: number;
  };
}

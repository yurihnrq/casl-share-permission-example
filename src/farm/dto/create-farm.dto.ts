import { Farm } from '@prisma/client';

export class CreateFarmDto implements Pick<Farm, 'name' | 'area'> {
  name: string;
  area: number;
}

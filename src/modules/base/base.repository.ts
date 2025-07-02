/* eslint-disable @typescript-eslint/no-unused-vars */
import { IBaseRepository } from 'src/interfaces/IBaseRepository';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { NotImplementedException } from '@nestjs/common';
import { Paginated } from 'src/interfaces/IPaginated';
import { UserDto } from '../user/dto/user.dto';

export abstract class BaseRepository<Dto = any, Entity = any>
  implements IBaseRepository<Dto, Entity>
{
  async findFilteredAsync(
    filter: DefaultFilter,
    user?: UserDto
  ): Promise<Paginated<Entity>> {
    throw new NotImplementedException();
  }
  abstract updateAsync(id: number, dto: Dto, user?: UserDto): Promise<Entity>;
  abstract findByIdAsync(id: number, user?: UserDto): Promise<Entity>;
  abstract deleteAsync(id: number, user?: UserDto): Promise<void>;
  abstract createAsync(dto: any, user?: UserDto): Promise<Entity>;
}

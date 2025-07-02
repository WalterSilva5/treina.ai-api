import { IBaseRepository } from 'src/interfaces/IBaseRepository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IBaseService } from 'src/interfaces/IBaseService';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { Paginated } from 'src/interfaces/IPaginated';

@Injectable()
export abstract class BaseService<Dto = any, Entity = any>
  implements IBaseService<Dto, Entity>
{
  constructor(protected repository: IBaseRepository) {}

  async createAsync(dto: Dto, user: UserDto): Promise<Entity> {
    return await this.repository.createAsync(dto, user);
  }

  async updateAsync(id: number, dto: Dto, user?: UserDto): Promise<Entity> {
    await this.findByIdAsync(id, user);
    return await this.repository.updateAsync(id, dto, user);
  }

  async deleteAsync(id: number, user?: UserDto): Promise<void> {
    await this.findByIdAsync(id, user);
    await this.repository.deleteAsync(id, user);
  }

  async findByIdAsync(id: number, user?: UserDto): Promise<Entity> {
    const item = await this.repository.findByIdAsync(id, user);
    if (!item) throw new NotFoundException('Objeto não encontrado');
    return item;
  }

  async findFilteredAsync(
    filter: DefaultFilter,
    user?: UserDto
  ): Promise<Paginated<Entity>> {
    return await this.repository.findFilteredAsync(filter, user);
  }
}

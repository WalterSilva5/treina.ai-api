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

  async createAsync(dto: Dto): Promise<Entity> {
    return await this.repository.createAsync(dto);
  }

  async updateAsync(id: number, dto: Dto): Promise<Entity> {
    await this.findByIdAsync(id);
    return await this.repository.updateAsync(id, dto);
  }

  async deleteAsync(id: number): Promise<void> {
    await this.findByIdAsync(id);
    await this.repository.deleteAsync(id);
  }

  async findByIdAsync(id: number): Promise<Entity> {
    const item = await this.repository.findByIdAsync(id);
    if (!item) throw new NotFoundException('Objeto não encontrado');
    return item;
  }

  async findFilteredAsync(
    filter: DefaultFilter,
    user?: UserDto
  ): Promise<Paginated<Entity>> {
    return await this.repository.findFilteredAsync(filter);
  }
}

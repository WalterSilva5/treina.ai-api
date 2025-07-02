import { PrismaService } from 'src/database/prisma/prisma.service';
import { MuscleGroupRepository } from './muscle-group.repository';
import { Injectable } from '@nestjs/common';
import { MuscleGroup } from '@prisma/client';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { Paginated } from 'src/interfaces/IPaginated';

@Injectable()
export class MuscleGroupService {
  constructor(
    protected readonly repository: MuscleGroupRepository,
    protected readonly prisma: PrismaService
  ) {}

  public async findFilteredAsync(filter: DefaultFilter): Promise<Paginated<MuscleGroup>> {
    return await this.repository.findFilteredAsync(filter);
  }

  public async findByIdAsync(id: number): Promise<MuscleGroup> {
    return await this.repository.findByIdAsync(id);
  }

  public async createAsync(dto: MuscleGroup): Promise<MuscleGroup> {
    return await this.repository.createAsync(dto);
  }

  public async updateAsync(id: number, dto: MuscleGroup): Promise<MuscleGroup> {
    return await this.repository.updateAsync(id, dto);
  }

  public async deleteAsync(id: number): Promise<void> {
    return await this.repository.deleteAsync(id);
  }
}

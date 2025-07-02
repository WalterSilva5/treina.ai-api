import { PrismaService } from 'src/database/prisma/prisma.service';
import { BaseRepository } from 'src/modules/base/base.repository';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { Paginated } from 'src/interfaces/IPaginated';
import { MuscleGroupDto } from './dto/muscle-group.dto';
import { Paginator } from 'src/utils/paginator';
import { Injectable } from '@nestjs/common';
import { MuscleGroup } from '@prisma/client';

@Injectable()
export class MuscleGroupRepository extends BaseRepository<MuscleGroupDto, MuscleGroup> {
  constructor(private prisma: PrismaService) {
    super();
  }

  async createAsync(dto: MuscleGroupDto, _user?: UserDto): Promise<MuscleGroup> {
    return await this.prisma.muscleGroup.create({
      data: {
        ...dto
      }
    });
  }

  async updateAsync(
    id: number,
    dto: MuscleGroupDto,
    _user?: UserDto
  ): Promise<MuscleGroup> {
    return await this.prisma.muscleGroup.update({
      where: { id },
      data: { ...dto }
    });
  }

  async deleteAsync(id: number, _user?: UserDto): Promise<void> {
    await this.prisma.muscleGroup.delete({
      where: { id: id }
    });
  }

  async findByIdAsync(id: number, _user?: UserDto): Promise<MuscleGroup> {
    return await this.prisma.muscleGroup.findFirst({
      where: { id }
    });
  }

  async findFilteredAsync(filter: DefaultFilter): Promise<Paginated<MuscleGroup>> {
    return await Paginator.applyPagination(this.prisma.muscleGroup, {
      ...filter,
      where: {
        deletedAt: null
      }
    });
  }
}

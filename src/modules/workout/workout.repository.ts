import { PrismaService } from 'src/database/prisma/prisma.service';
import { BaseRepository } from 'src/modules/base/base.repository';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { Paginated } from 'src/interfaces/IPaginated';
import { WorkoutDto } from './dto/workout.dto';
import { Paginator } from 'src/utils/paginator';
import { Injectable } from '@nestjs/common';
import { Workout } from '@prisma/client';

@Injectable()
export class WorkoutRepository extends BaseRepository<WorkoutDto, Workout> {
  constructor(private prisma: PrismaService) {
    super();
  }

  async createAsync(dto: WorkoutDto): Promise<Workout> {
    return await this.prisma.workout.create({
      data: {
        name: dto.name,
        description: dto.description,
        user: {
          connect: {
            id: dto.userId
          }
        }
      }
    });
  }

  async updateAsync(id: number, dto: WorkoutDto): Promise<Workout> {
    return await this.prisma.workout.update({
      where: { id },
      data: { ...dto }
    });
  }

  async deleteAsync(id: number): Promise<void> {
    await this.prisma.workout.delete({
      where: { id: id }
    });
  }

  async findByIdAsync(id: number): Promise<Workout> {
    return await this.prisma.workout.findFirst({
      where: { id }
    });
  }

  async findFilteredAsync(
    filter: DefaultFilter,
    user?: UserDto
  ): Promise<Paginated<Workout>> {
    return await Paginator.applyPagination(this.prisma.workout, {
      ...filter,
      where: {
        idUser: user.id,
        deletedAt: null
      }
    });
  }
}

import { PrismaService } from 'src/database/prisma/prisma.service';
import { BaseRepository } from 'src/modules/base/base.repository';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { Paginated } from 'src/interfaces/IPaginated';
import { ExerciseDto } from './dto/exercise.dto';
import { Paginator } from 'src/utils/paginator';
import { Injectable } from '@nestjs/common';
import { Exercise } from '@prisma/client';

@Injectable()
export class ExerciseRepository extends BaseRepository<ExerciseDto, Exercise> {
  constructor(private prisma: PrismaService) {
    super();
  }

  async createAsync(dto: ExerciseDto): Promise<Exercise> {
    return await this.prisma.exercise.create({
      data: { ...dto }
    });
  }

  async updateAsync(id: number, dto: ExerciseDto): Promise<Exercise> {
    return await this.prisma.exercise.update({
      where: { id },
      data: {
        ...dto
      }
    });
  }

  async deleteAsync(id: number): Promise<void> {
    await this.prisma.exercise.delete({
      where: { id: id }
    });
  }

  async findByIdAsync(id: number): Promise<Exercise> {
    return await this.prisma.exercise.findFirst({
      where: { id }
    });
  }

  async findFilteredAsync(filter: DefaultFilter): Promise<Paginated<Exercise>> {
    return await Paginator.applyPagination(this.prisma.exercise, {
      ...filter,
      where: {
        deletedAt: null
      }
    });
  }
}

import { PrismaService } from 'src/database/prisma/prisma.service';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { Paginated } from 'src/interfaces/IPaginated';
import { Paginator } from 'src/utils/paginator';
import { Injectable } from '@nestjs/common';
import { WorkoutExercise } from '@prisma/client';

@Injectable()
export class WorkoutExerciseRepository {
  constructor(protected readonly prisma: PrismaService) {}
  async findFilteredAsync(
    filter: DefaultFilter,
    user?: UserDto
  ): Promise<Paginated<WorkoutExercise>> {
    return await Paginator.applyPagination(this.prisma.workoutExercise, {
      ...filter,
      where: {
        idUser: user.id,
        deletedAt: null
      }
    });
  }
}

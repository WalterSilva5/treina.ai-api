import { PrismaService } from 'src/database/prisma/prisma.service';
import { WorkoutExerciseRepository } from './workout-exercise.repository';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { Paginated } from 'src/interfaces/IPaginated';
import { UserDto } from '../user/dto/user.dto';
import { WorkoutExercise } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkoutExerciseService {
  constructor(
    protected readonly repository: WorkoutExerciseRepository,
    protected readonly prisma: PrismaService
  ) {}
  async findFilteredAsync(
    filter: DefaultFilter,
    user?: UserDto
  ): Promise<Paginated<WorkoutExercise>> {
    return await this.repository.findFilteredAsync(filter, user);
  }
}

import { PrismaService } from 'src/database/prisma/prisma.service';
import { BaseService } from 'src/modules/base/base.service';
import { WorkoutRepository } from './workout.repository';
import { WorkoutDto } from './dto/workout.dto';
import { Injectable } from '@nestjs/common';
import { Workout } from '@prisma/client';

@Injectable()
export class WorkoutService extends BaseService<WorkoutDto, Workout> {
  constructor(
    protected readonly repository: WorkoutRepository,
    protected readonly prisma: PrismaService
  ) {
    super(repository);
  }
}

import { PrismaService } from 'src/database/prisma/prisma.service';
import { BaseService } from 'src/modules/base/base.service';
import { ExerciseRepository } from './exercise.repository';
import { ExerciseDto } from './dto/exercise.dto';
import { Injectable } from '@nestjs/common';
import { Exercise } from '@prisma/client';

@Injectable()
export class ExerciseService extends BaseService<ExerciseDto, Exercise> {
  constructor(
    protected readonly repository: ExerciseRepository,
    protected readonly prisma: PrismaService
  ) {
    super(repository);
  }
}

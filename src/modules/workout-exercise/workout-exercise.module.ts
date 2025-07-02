import { PrismaModule } from '../../database/prisma/prisma.module';
import { WorkoutExerciseController } from './workout-exercise.controller';
import { WorkoutExerciseRepository } from './workout-exercise.repository';
import { WorkoutExerciseService } from './workout-exercise.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [WorkoutExerciseService, WorkoutExerciseRepository],
  controllers: [WorkoutExerciseController],
  exports: [WorkoutExerciseService],
  imports: [PrismaModule]
})
export class WorkoutExerciseModule {}

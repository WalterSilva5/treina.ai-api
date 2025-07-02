import { PrismaModule } from '../../database/prisma/prisma.module';
import { ExerciseController } from './exercise.controller';
import { ExerciseRepository } from './exercise.repository';
import { ExerciseService } from './exercise.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ExerciseService, ExerciseRepository],
  controllers: [ExerciseController],
  exports: [ExerciseService],
  imports: [PrismaModule]
})
export class ExerciseModule {}

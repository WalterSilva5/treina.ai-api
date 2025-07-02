import { PrismaModule } from '../../database/prisma/prisma.module';
import { WorkoutController } from './workout.controller';
import { WorkoutRepository } from './workout.repository';
import { WorkoutService } from './workout.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [WorkoutService, WorkoutRepository],
  controllers: [WorkoutController],
  exports: [WorkoutService],
  imports: [PrismaModule]
})
export class WorkoutModule {}

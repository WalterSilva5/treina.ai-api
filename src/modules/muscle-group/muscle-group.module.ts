import { PrismaModule } from '../../database/prisma/prisma.module';
import { MuscleGroupController } from './muscle-group.controller';
import { MuscleGroupRepository } from './muscle-group.repository';
import { MuscleGroupService } from './muscle-group.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MuscleGroupService, MuscleGroupRepository],
  controllers: [MuscleGroupController],
  exports: [MuscleGroupService],
  imports: [PrismaModule]
})
export class MuscleGroupModule {}

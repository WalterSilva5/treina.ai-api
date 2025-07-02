import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { AuthenticatedUser } from 'src/decorators/authenticated-user.decorator';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { WorkoutExerciseService } from './workout-exercise.service';
import { WorkoutExerciseDto } from './dto/workout-exercise.dto';
import { UserDto } from '../user/dto/user.dto';
import { ApiOkResponsePaginated } from 'src/interfaces/IPaginated';

@Controller('workoutexercise')
@ApiTags('workoutexercise')
@ApiBearerAuth()
export class WorkoutExerciseController {
  constructor(protected service: WorkoutExerciseService) {}

  @Get()
  @ApiOkResponsePaginated(WorkoutExerciseDto)
  protected async getFilteredAsync(
    @AuthenticatedUser() user: UserDto,
    @Query() filter: DefaultFilter
  ): Promise<any> {
    return this.service.findFilteredAsync(filter, user);
  }
}

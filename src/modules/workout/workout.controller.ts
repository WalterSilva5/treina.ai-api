import { BaseController } from 'src/modules/base/base.controller';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res
} from '@nestjs/common';
import { AuthenticatedUser } from 'src/decorators/authenticated-user.decorator';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { WorkoutService } from './workout.service';
import { WorkoutDto } from './dto/workout.dto';
import { UserDto } from '../user/dto/user.dto';
import { Response } from 'express';
import { ApiOkResponsePaginated } from 'src/interfaces/IPaginated';

@Controller('workout')
@ApiTags('workout')
@ApiBearerAuth()
export class WorkoutController extends BaseController<WorkoutDto> {
  constructor(protected service: WorkoutService) {
    super(service);
  }

  @Get()
  @ApiOkResponsePaginated(WorkoutDto)
  protected async getFilteredAsync(
    @AuthenticatedUser() user: UserDto,
    @Query() filter: DefaultFilter
  ): Promise<any> {
    return this.service.findFilteredAsync(filter, user);
  }

  @Get('/:id')
  @ApiOkResponse({ type: WorkoutDto })
  protected async findByIdAsync(
    @AuthenticatedUser() user: UserDto,
    @Param('id', ParseIntPipe) id: number
  ): Promise<any> {
    return this.service.findByIdAsync(id, user);
  }

  @Post()
  @ApiCreatedResponse({ type: WorkoutDto })
  protected async createAsync(
    @AuthenticatedUser() user: UserDto,
    @Body() dto: WorkoutDto
  ): Promise<any> {
    return this.service.createAsync(dto, user);
  }

  @Put('/:id')
  @ApiOkResponse({ type: WorkoutDto })
  protected async updateAsync(
    @AuthenticatedUser() user: UserDto,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: WorkoutDto
  ): Promise<any> {
    return this.service.updateAsync(id, dto, user);
  }

  @Delete('/:id')
  @ApiNoContentResponse({ type: undefined })
  protected async deleteAsync(
    @Res({ passthrough: true }) response: Response,
    @AuthenticatedUser() user: UserDto,
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    response.status(204);
    return this.service.deleteAsync(id, user);
  }
}
